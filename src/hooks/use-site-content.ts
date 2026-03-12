import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type SiteContentRow = {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
  sort_order: number;
};

const normalize = (value: string) => value.trim().toLowerCase();

export const useSiteContent = (page: string) => {
  const [items, setItems] = useState<SiteContentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("site_content")
        .select("id, page, section, content_key, content_value, content_type, sort_order")
        .eq("page", page)
        .order("section")
        .order("sort_order");

      if (!active) return;
      setItems((data as SiteContentRow[]) ?? []);
      setLoading(false);
    };

    load();

    return () => {
      active = false;
    };
  }, [page]);

  const contentMap = useMemo(() => {
    const map: Record<string, Record<string, SiteContentRow>> = {};

    for (const item of items) {
      const section = normalize(item.section);
      const key = normalize(item.content_key);
      if (!map[section]) map[section] = {};
      map[section][key] = item;
    }

    return map;
  }, [items]);

  const getValue = useCallback(
    (section: string, key: string, fallback = "") => {
      return contentMap[normalize(section)]?.[normalize(key)]?.content_value ?? fallback;
    },
    [contentMap],
  );

  const getList = useCallback(
    (section: string, key: string, fallback: string[] = []) => {
      const raw = getValue(section, key, "");
      if (!raw.trim()) return fallback;

      return raw
        .split(/\r?\n|,/) 
        .map((entry) => entry.trim())
        .filter(Boolean);
    },
    [getValue],
  );

  const getSectionEntries = useCallback(
    (section: string) => {
      return items
        .filter((item) => normalize(item.section) === normalize(section))
        .sort((a, b) => a.sort_order - b.sort_order || a.content_key.localeCompare(b.content_key));
    },
    [items],
  );

  return {
    items,
    loading,
    getValue,
    getList,
    getSectionEntries,
  };
};
