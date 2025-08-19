import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface AnimatedGameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badgeText: string;
  badgeColor: string;
  gradientFrom: string;
  gradientTo: string;
  features: { icon: LucideIcon; text: string }[];
  buttonText: string;
  buttonColor: string;
  onClick: () => void;
  delay?: number;
}

const AnimatedGameCard: React.FC<AnimatedGameCardProps> = ({
  title,
  description,
  icon: Icon,
  badgeText,
  badgeColor,
  gradientFrom,
  gradientTo,
  features,
  buttonText,
  buttonColor,
  onClick,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="relative group"
    >
      {/* Glowing background effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <Card className={`relative bg-gradient-to-r ${gradientFrom} ${gradientTo} backdrop-blur-md border-white/20 shadow-2xl overflow-hidden`}>
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white text-xl font-bold">{title}</CardTitle>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Badge 
                variant="secondary" 
                className={`${badgeColor} text-white font-semibold shadow-lg`}
              >
                {badgeText}
              </Badge>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-4">
          <motion.p 
            className="text-white/90 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            {description}
          </motion.p>

          <motion.div 
            className="flex items-center gap-4 text-white/80 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="w-4 h-4" />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.4 }}
          >
            <Button 
              className={`w-full ${buttonColor} text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              onClick={onClick}
            >
              {buttonText}
            </Button>
          </motion.div>
        </CardContent>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </Card>
    </motion.div>
  );
};

export default AnimatedGameCard; 