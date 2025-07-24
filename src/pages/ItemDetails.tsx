import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Package, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useItems } from '@/context/ItemsContext';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items, requestToBorrow } = useItems();
  const { toast } = useToast();
  const [borrowerName, setBorrowerName] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  const item = items.find(item => item.id === id);

  if (!item) {
    return <Navigate to="/404" replace />;
  }

  const handleRequestToBorrow = async () => {
    if (!borrowerName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to request this item.",
        variant: "destructive",
      });
      return;
    }

    setIsRequesting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      requestToBorrow(item.id, borrowerName.trim());
      toast({
        title: "Request sent!",
        description: `Your request to borrow "${item.name}" has been sent to ${item.owner}.`,
      });
      setIsRequesting(false);
      setBorrowerName('');
    }, 1000);
  };

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

  const getAvailabilityStatus = () => {
    if (item.sold) {
      return {
        icon: <XCircle className="h-5 w-5" />,
        text: 'Sold',
        variant: 'destructive' as const,
        description: 'This item is no longer available'
      };
    }
    
    if (!item.available) {
      return {
        icon: <Clock className="h-5 w-5" />,
        text: `Borrowed by ${item.borrowedBy}`,
        variant: 'secondary' as const,
        description: 'This item is currently being borrowed'
      };
    }

    return {
      icon: <CheckCircle className="h-5 w-5" />,
      text: 'Available',
      variant: 'default' as const,
      description: 'This item is available for borrowing'
    };
  };

  const status = getAvailabilityStatus();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Browse</span>
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {item.name}
                  </h1>
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className={getConditionColor(item.condition)}>
                      {item.condition}
                    </Badge>
                    <Badge variant="outline">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <Badge 
                  variant={status.variant}
                  className="flex items-center space-x-1 ml-4"
                >
                  {status.icon}
                  <span>{status.text}</span>
                </Badge>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Owner Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Owner:</span>
                  <span className="font-medium">{item.owner}</span>
                </div>
                {item.dateAdded && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shared on:</span>
                    <span className="font-medium">
                      {new Date(item.dateAdded).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">{status.description}</span>
                </div>
              </CardContent>
            </Card>

            {/* Request to Borrow */}
            {item.available && !item.sold && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Request to Borrow</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="borrower-name">Your Name</Label>
                    <Input
                      id="borrower-name"
                      placeholder="Enter your full name"
                      value={borrowerName}
                      onChange={(e) => setBorrowerName(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2 p-3 bg-accent-soft rounded-lg">
                    <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-accent-foreground">
                        This is a demo request
                      </p>
                      <p className="text-muted-foreground">
                        In a real app, this would notify the owner and handle the lending process.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleRequestToBorrow}
                    disabled={isRequesting || !borrowerName.trim()}
                    className="w-full"
                    variant="cta"
                  >
                    {isRequesting ? 'Sending Request...' : 'Send Borrow Request'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Unavailable Message */}
            {(!item.available || item.sold) && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    {status.icon}
                    <div>
                      <h3 className="font-medium text-foreground">
                        Item Not Available
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {status.description}. Check back later or browse other available items.
                      </p>
                      <Button asChild variant="outline" className="mt-3">
                        <Link to="/">Browse Other Items</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetails;