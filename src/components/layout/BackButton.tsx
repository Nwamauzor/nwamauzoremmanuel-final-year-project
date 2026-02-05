 import { useNavigate } from "react-router-dom";
 import { motion } from "framer-motion";
 import { ArrowLeft } from "lucide-react";
 
 const BackButton = () => {
   const navigate = useNavigate();
 
   return (
     <motion.button
       onClick={() => navigate(-1)}
       className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-muted-foreground hover:text-primary bg-muted/50 hover:bg-primary/10 rounded-lg transition-all group"
       initial={{ opacity: 0, x: -20 }}
       animate={{ opacity: 1, x: 0 }}
       whileHover={{ x: -5 }}
       whileTap={{ scale: 0.95 }}
     >
       <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
       <span>Back</span>
     </motion.button>
   );
 };
 
 export default BackButton;