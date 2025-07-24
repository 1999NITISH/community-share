import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useItems } from '@/context/ItemsContext';

const SearchAndFilter: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    items
  } = useItems();

  // Get unique categories from items
  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(items.map(item => item.category)));
    return ['All', ...cats.sort()];
  }, [items]);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search items, descriptions, or owners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-background">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-background">
                <div className="flex items-center space-x-2">
                  <SortAsc className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="dateAdded">Recently Added</SelectItem>
                <SelectItem value="availability">Available First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-muted-foreground">
          {searchTerm || selectedCategory !== 'All' ? (
            <span>
              Showing filtered results
              {searchTerm && <span> for "{searchTerm}"</span>}
              {selectedCategory !== 'All' && <span> in {selectedCategory}</span>}
            </span>
          ) : (
            <span>Showing all available items</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;