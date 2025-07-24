import React from 'react';
import { Plus, Package, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useItems } from '@/context/ItemsContext';
import ItemCard from '@/components/ItemCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const Catalog: React.FC = () => {
  const { filteredItems, markAsSold } = useItems();
  const { toast } = useToast();

  const handleMarkAsSold = (itemId: string) => {
    markAsSold(itemId);
    toast({
      title: "Item marked as sold",
      description: "The item has been removed from available listings.",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-gradient-community rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Discover & Share
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with your neighbors to borrow and lend household items. 
            Build community while promoting sustainability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <Button asChild variant="community" size="lg">
              <Link to="/add-item" className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Share an Item</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/map" className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>View Map</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter />

        {/* Items Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Available Items ({filteredItems.length})
            </h2>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">
                No items found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters, or be the first to share an item!
              </p>
              <Button asChild variant="default">
                <Link to="/add-item">
                  Share an Item
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onMarkAsSold={handleMarkAsSold}
                  showOwnerActions={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Community Stats */}
        <div className="bg-gradient-card rounded-lg border border-border p-8 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Building Stronger Communities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredItems.length}
              </div>
              <div className="text-muted-foreground">Items Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {new Set(filteredItems.map(item => item.owner)).size}
              </div>
              <div className="text-muted-foreground">Active Neighbors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredItems.filter(item => !item.available).length}
              </div>
              <div className="text-muted-foreground">Items Borrowed</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;