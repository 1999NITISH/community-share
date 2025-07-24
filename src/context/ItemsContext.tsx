import React, { createContext, useContext, useState, useEffect } from 'react';
import drillImage from '@/assets/drill.jpg';
import tentImage from '@/assets/tent.jpg';
import crockpotImage from '@/assets/crockpot.jpg';
import yogamatImage from '@/assets/yogamat.jpg';
import ladderImage from '@/assets/ladder.jpg';
import catanImage from '@/assets/catan.jpg';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  owner: string;
  condition: string;
  available: boolean;
  image: string;
  borrowedBy: string | null;
  sold: boolean;
  dateAdded?: string;
}

export interface ItemsContextType {
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'available' | 'borrowedBy' | 'sold' | 'dateAdded'>) => void;
  markAsSold: (itemId: string) => void;
  requestToBorrow: (itemId: string, borrowerName: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filteredItems: Item[];
}

const mockItems: Item[] = [
  {
    id: "itm001",
    name: "Cordless Drill",
    description: "18V cordless drill, lightly used. Perfect for home improvement projects and small repairs.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image: drillImage,
    borrowedBy: null,
    sold: false,
    dateAdded: "2024-01-15"
  },
  {
    id: "itm002",
    name: "Camping Tent",
    description: "4-person waterproof tent, easy setup. Great for family camping trips.",
    category: "Outdoors",
    owner: "Brian Lee",
    condition: "Excellent",
    available: true,
    image: tentImage,
    borrowedBy: null,
    sold: false,
    dateAdded: "2024-01-12"
  },
  {
    id: "itm003",
    name: "Crock Pot",
    description: "Large 6-quart slow cooker, works great. Perfect for preparing meals while you're away.",
    category: "Kitchen",
    owner: "Samantha Green",
    condition: "Very Good",
    available: false,
    image: crockpotImage,
    borrowedBy: "Prachi Patel",
    sold: false,
    dateAdded: "2024-01-10"
  },
  {
    id: "itm004",
    name: "Yoga Mat",
    description: "Non-slip yoga mat, 6mm thick, blue color. Ideal for yoga practice and exercise.",
    category: "Fitness",
    owner: "Ravi Mehra",
    condition: "Good",
    available: true,
    image: yogamatImage,
    borrowedBy: null,
    sold: false,
    dateAdded: "2024-01-08"
  },
  {
    id: "itm005",
    name: "Ladder",
    description: "6-foot aluminum step ladder, sturdy and reliable for household tasks.",
    category: "Tools",
    owner: "Dana Wang",
    condition: "Good",
    available: true,
    image: ladderImage,
    borrowedBy: null,
    sold: false,
    dateAdded: "2024-01-05"
  },
  {
    id: "itm006",
    name: "Board Game: Settlers of Catan",
    description: "Complete set, all pieces included. Perfect for game nights with friends and family.",
    category: "Games",
    owner: "Luis García",
    condition: "Like New",
    available: true,
    image: catanImage,
    borrowedBy: null,
    sold: false,
    dateAdded: "2024-01-03"
  }
];

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(() => {
    const stored = localStorage.getItem('neighborhoodItems');
    return stored ? JSON.parse(stored) : mockItems;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('neighborhoodItems', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<Item, 'id' | 'available' | 'borrowedBy' | 'sold' | 'dateAdded'>) => {
    const item: Item = {
      ...newItem,
      id: `itm${Date.now()}`,
      available: true,
      borrowedBy: null,
      sold: false,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setItems(prev => [item, ...prev]);
  };

  const markAsSold = (itemId: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, sold: true, available: false }
          : item
      )
    );
  };

  const requestToBorrow = (itemId: string, borrowerName: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, available: false, borrowedBy: borrowerName }
          : item
      )
    );
  };

  // Filter and sort items
  const filteredItems = React.useMemo(() => {
    let filtered = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.owner.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'owner':
          return a.owner.localeCompare(b.owner);
        case 'dateAdded':
          return new Date(b.dateAdded || '').getTime() - new Date(a.dateAdded || '').getTime();
        case 'availability':
          return Number(b.available) - Number(a.available);
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchTerm, selectedCategory, sortBy]);

  const value: ItemsContextType = {
    items,
    addItem,
    markAsSold,
    requestToBorrow,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredItems
  };

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  );
};