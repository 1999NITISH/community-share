import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, Search, User, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-community rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">NeighborShare</h1>
                <p className="text-xs text-muted-foreground">Community Resource Sharing</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-2">
              <Button 
                variant={isActivePath('/') ? 'default' : 'ghost'} 
                size="sm" 
                asChild
              >
                <Link to="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Browse Items</span>
                </Link>
              </Button>
              
              <Button 
                variant={isActivePath('/add-item') ? 'default' : 'ghost'} 
                size="sm" 
                asChild
              >
                <Link to="/add-item" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Share Item</span>
                </Link>
              </Button>

              <Button 
                variant={isActivePath('/my-requests') ? 'default' : 'ghost'} 
                size="sm" 
                asChild
              >
                <Link to="/my-requests" className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>My Requests</span>
                </Link>
              </Button>

              <Button 
                variant={isActivePath('/map') ? 'default' : 'ghost'} 
                size="sm" 
                asChild
              >
                <Link to="/map" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Map View</span>
                </Link>
              </Button>

              <Button 
                variant={isActivePath('/profile') ? 'default' : 'ghost'} 
                size="sm" 
                asChild
              >
                <Link to="/profile" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </Button>
            </nav>

            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-40">
        <div className="grid grid-cols-5 py-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "flex flex-col items-center space-y-1 rounded-none h-auto py-3",
              isActivePath('/') && "text-primary bg-primary-soft"
            )}
            asChild
          >
            <Link to="/">
              <Home className="h-5 w-5" />
              <span className="text-xs">Browse</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "flex flex-col items-center space-y-1 rounded-none h-auto py-3",
              isActivePath('/add-item') && "text-primary bg-primary-soft"
            )}
            asChild
          >
            <Link to="/add-item">
              <Plus className="h-5 w-5" />
              <span className="text-xs">Add</span>
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "flex flex-col items-center space-y-1 rounded-none h-auto py-3",
              isActivePath('/my-requests') && "text-primary bg-primary-soft"
            )}
            asChild
          >
            <Link to="/my-requests">
              <Search className="h-5 w-5" />
              <span className="text-xs">Requests</span>
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "flex flex-col items-center space-y-1 rounded-none h-auto py-3",
              isActivePath('/map') && "text-primary bg-primary-soft"
            )}
            asChild
          >
            <Link to="/map">
              <MapPin className="h-5 w-5" />
              <span className="text-xs">Map</span>
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "flex flex-col items-center space-y-1 rounded-none h-auto py-3",
              isActivePath('/profile') && "text-primary bg-primary-soft"
            )}
            asChild
          >
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};

export default Layout;