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
        <div className="relative overflow-hidden bg-gradient-soft rounded-2xl border border-border p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="p-4 bg-primary/10 rounded-full border border-primary/20">
                {/* <Sparkles className="h-8 w-8 text-primary" /> */}
                <img src="./image.png" alt="image.png" width="250" height="300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Share, Borrow, Connect
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Transform your neighborhood into a thriving community! 
              Discover amazing items, meet wonderful neighbors, 
              and build a sustainable future together.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Tools & Equipment</h3>
                <p className="text-muted-foreground text-sm">Drills, ladders, and more</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Outdoor Gear</h3>
                <p className="text-muted-foreground text-sm">Camping, sports, adventure</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="w-12 h-12 bg-cta/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Plus className="h-6 w-6 text-cta" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Kitchen Items</h3>
                <p className="text-muted-foreground text-sm">Appliances, cookware, gadgets</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/add-item" className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Share an Item</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/map" className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Explore Map</span>
                </Link>
              </Button>
            </div>
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
        <div className="bg-gradient-card rounded-xl border border-border p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">
              Building Stronger Communities
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">
                {filteredItems.length}
              </div>
              <div className="text-muted-foreground font-medium">Items Shared</div>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Plus className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold text-primary">
                {new Set(filteredItems.map(item => item.owner)).size}
              </div>
              <div className="text-muted-foreground font-medium">Active Neighbors</div>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-16 bg-cta/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-cta" />
              </div>
              <div className="text-3xl font-bold text-primary">
                {filteredItems.filter(item => !item.available).length}
              </div>
              <div className="text-muted-foreground font-medium">Items Borrowed</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;