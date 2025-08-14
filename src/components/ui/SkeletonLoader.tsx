interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'badge' | 'rectangle' | 'circle';
  count?: number;
}

export const SkeletonLoader = ({ 
  className = '', 
  variant = 'text',
  count = 1 
}: SkeletonLoaderProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 bg-gray-200 rounded animate-pulse';
      case 'badge':
        return 'h-6 w-16 bg-gray-200 rounded-full animate-pulse';
      case 'rectangle':
        return 'h-32 bg-gray-200 rounded animate-pulse';
      case 'circle':
        return 'h-8 w-8 bg-gray-200 rounded-full animate-pulse';
      default:
        return 'h-4 bg-gray-200 rounded animate-pulse';
    }
  };

  const skeletons = Array.from({ length: count }, (_, index) => {
    // Add slight variation in width for text skeletons
    const randomWidth = variant === 'text' && count > 1 
      ? `w-${['full', '5/6', '4/5', '3/4'][index % 4] || 'full'}` 
      : '';
    
    return (
      <div 
        key={index} 
        className={`${getVariantClasses()} ${randomWidth} ${className}`}
        style={{ 
          animationDelay: `${index * 100}ms` // Stagger the animation
        }}
      />
    );
  });

  if (count === 1) {
    return skeletons[0];
  }

  if (variant === 'badge') {
    return (
      <div className="flex flex-wrap gap-2">
        {skeletons}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {skeletons}
    </div>
  );
};
