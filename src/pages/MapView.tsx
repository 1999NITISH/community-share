import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Filter, Package, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';

interface MapLocation {
  itemId: string;
  lat: number;
  lng: number;
  address: string;
  name: string;
  category: string;
  available: boolean;
  owner: string;
}

// Mock map data
const mockLocations: MapLocation[] = [
  {
    itemId: "itm001",
    lat: 28.4595,
    lng: 77.0266,
    address: "Block A, Sector 45",
    name: "Cordless Drill",
    category: "Tools",
    available: true,
    owner: "Alice Johnson"
  },
  {
    itemId: "itm002",
    lat: 28.4652,
    lng: 77.0565,
    address: "Block B, Sector 50",
    name: "Camping Tent",
    category: "Outdoors",
    available: true,
    owner: "Brian Lee"
  },
  {
    itemId: "itm003",
    lat: 28.4531,
    lng: 77.0401,
    address: "Block C, Sector 47",
    name: "Crock Pot",
    category: "Kitchen",
    available: false,
    owner: "Samantha Green"
  },
  {
    itemId: "itm004",
    lat: 28.4687,
    lng: 77.0298,
    address: "Block D, Sector 48",
    name: "Yoga Mat",
    category: "Fitness",
    available: true,
    owner: "Ravi Mehra"
  },
  {
    itemId: "itm005",
    lat: 28.4612,
    lng: 77.0432,
    address: "Block E, Sector 49",
    name: "Ladder",
    category: "Tools",
    available: true,
    owner: "Dana Wang"
  }
];

const MapView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MapLocation | null>(null);

  const categories = ['All', ...Array.from(new Set(mockLocations.map(loc => loc.category)))];

  const filteredLocations = mockLocations.filter(location => 
    selectedCategory === 'All' || location.category === selectedCategory
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Browse</span>
          </Link>
        </Button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-community rounded-full">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Map View</h1>
          <p className="text-muted-foreground">
            Discover items available in your neighborhood
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5" />
                    <span>Interactive Map</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
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
                </div>
              </CardHeader>
              <CardContent className="h-full">
                {/* Placeholder for actual map */}
                <div className="w-full h-full bg-gradient-soft rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Interactive Map</h3>
                      <p className="text-muted-foreground">
                        In a real implementation, this would show an interactive map
                        <br />
                        with pins for each item location using services like Google Maps or Mapbox
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {filteredLocations.map((location, index) => (
                        <Button
                          key={location.itemId}
                          variant={selectedItem?.itemId === location.itemId ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedItem(location)}
                          className="flex items-center space-x-1"
                        >
                          <MapPin className="h-3 w-3" />
                          <span>Pin {index + 1}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Item Details */}
            {selectedItem ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedItem.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedItem.owner}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{selectedItem.category}</Badge>
                    <Badge variant={selectedItem.available ? "default" : "secondary"}>
                      {selectedItem.available ? "Available" : "Borrowed"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedItem.address}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button asChild size="sm">
                      <Link to={`/items/${selectedItem.itemId}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-2">Select an Item</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on a pin above to see item details
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Nearby Items List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Nearby Items ({filteredLocations.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredLocations.map((location) => (
                  <div
                    key={location.itemId}
                    className={`p-3 rounded-lg border transition-smooth cursor-pointer hover:shadow-card ${
                      selectedItem?.itemId === location.itemId 
                        ? 'border-primary bg-primary-soft' 
                        : 'border-border'
                    }`}
                    onClick={() => setSelectedItem(location)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">
                          {location.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {location.owner}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {location.address}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge variant="outline" className="text-xs">
                          {location.category}
                        </Badge>
                        <Badge 
                          variant={location.available ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {location.available ? "Available" : "Borrowed"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Map Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Available Items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span>Borrowed Items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>Sold Items</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MapView;