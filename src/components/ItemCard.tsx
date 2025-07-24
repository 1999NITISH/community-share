import React from 'react';
import { Link } from 'react-router-dom';
import { User, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { Item } from '@/context/ItemsContext';
import { cn } from '@/lib/utils';

interface ItemCardProps {
  item: Item;
  onMarkAsSold?: (itemId: string) => void;
  showOwnerActions?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  onMarkAsSold, 
  showOwnerActions = false 
}) => {
  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
      case 'like new':
        return 'bg-primary text-primary-foreground';
      case 'very good':
      case 'good':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getAvailabilityBadge = () => {
    if (item.sold) {
      return (
        <Badge variant="destructive" className="flex items-center space-x-1">
          <XCircle className="h-3 w-3" />
          <span>Sold</span>
        </Badge>
      );
    }
    
    if (!item.available) {
      return (
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>Borrowed</span>
        </Badge>
      );
    }

    return (
      <Badge variant="default" className="flex items-center space-x-1 bg-primary">
        <CheckCircle className="h-3 w-3" />
        <span>Available</span>
      </Badge>
    );
  };

  return (
    <Card className={cn(
      "group overflow-hidden transition-smooth hover:shadow-floating",
      "bg-gradient-card border-border/50",
      !item.available && "opacity-75"
    )}>
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {item.description}
            </p>
          </div>
          {getAvailabilityBadge()}
        </div>

        <div className="flex items-center justify-between mb-3">
          <Badge className={getConditionColor(item.condition)}>
            {item.condition}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{item.owner}</span>
        </div>

        {item.borrowedBy && (
          <div className="mt-2 text-xs text-muted-foreground">
            Borrowed by {item.borrowedBy}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col space-y-2">
        <Button 
          asChild 
          className="w-full" 
          variant={item.available && !item.sold ? "default" : "outline"}
          disabled={item.sold}
        >
          <Link to={`/items/${item.id}`}>
            {item.sold ? 'View Details' : item.available ? 'View & Request' : 'View Details'}
          </Link>
        </Button>

        {showOwnerActions && item.available && !item.sold && onMarkAsSold && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMarkAsSold(item.id)}
            className="w-full text-xs"
          >
            Mark as Sold
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;