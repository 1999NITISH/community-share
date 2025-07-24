import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

interface BorrowRequest {
  id: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  owner: string;
  status: 'pending' | 'approved' | 'denied' | 'returned';
  requestDate: string;
  approvedDate?: string;
  returnDate?: string;
  message?: string;
}

// Mock data for demonstration
const mockRequests: BorrowRequest[] = [
  {
    id: 'req001',
    itemId: 'itm001',
    itemName: 'Cordless Drill',
    itemImage: '/src/assets/drill.jpg',
    owner: 'Alice Johnson',
    status: 'pending',
    requestDate: '2024-01-20',
    message: 'Hi! I need this for a small home repair project this weekend.'
  },
  {
    id: 'req002',
    itemId: 'itm004',
    itemName: 'Yoga Mat',
    itemImage: '/src/assets/yogamat.jpg',
    owner: 'Ravi Mehra',
    status: 'approved',
    requestDate: '2024-01-18',
    approvedDate: '2024-01-19',
    message: 'Would love to borrow this for my morning yoga practice.'
  },
  {
    id: 'req003',
    itemId: 'itm002',
    itemName: 'Camping Tent',
    itemImage: '/src/assets/tent.jpg',
    owner: 'Brian Lee',
    status: 'returned',
    requestDate: '2024-01-10',
    approvedDate: '2024-01-11',
    returnDate: '2024-01-15',
    message: 'Planning a family camping trip next weekend.'
  }
];

const MyRequests: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Pending</span>
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="default" className="flex items-center space-x-1 bg-primary">
            <CheckCircle className="h-3 w-3" />
            <span>Approved</span>
          </Badge>
        );
      case 'denied':
        return (
          <Badge variant="destructive" className="flex items-center space-x-1">
            <XCircle className="h-3 w-3" />
            <span>Denied</span>
          </Badge>
        );
      case 'returned':
        return (
          <Badge variant="outline" className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3" />
            <span>Returned</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusDescription = (request: BorrowRequest) => {
    switch (request.status) {
      case 'pending':
        return `Waiting for ${request.owner} to respond`;
      case 'approved':
        return `Approved on ${new Date(request.approvedDate!).toLocaleDateString()}`;
      case 'denied':
        return 'Request was declined';
      case 'returned':
        return `Returned on ${new Date(request.returnDate!).toLocaleDateString()}`;
      default:
        return '';
    }
  };

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

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-community rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">My Requests</h1>
          <p className="text-muted-foreground">
            Track your borrowing requests and their status
          </p>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {mockRequests.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">
                  No requests yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Browse items and make your first borrow request!
                </p>
                <Button asChild>
                  <Link to="/">Browse Items</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Your Requests ({mockRequests.length})
                </h2>
              </div>

              {mockRequests.map((request) => (
                <Card key={request.id} className="transition-smooth hover:shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Item Image */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={request.itemImage}
                          alt={request.itemName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Request Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {request.itemName}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <User className="h-4 w-4" />
                              <span>Owner: {request.owner}</span>
                            </div>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>Requested on {new Date(request.requestDate).toLocaleDateString()}</p>
                          <p>{getStatusDescription(request)}</p>
                        </div>

                        {request.message && (
                          <div className="bg-muted rounded-lg p-3">
                            <p className="text-sm text-muted-foreground">
                              <strong>Your message:</strong> "{request.message}"
                            </p>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/items/${request.itemId}`}>View Item</Link>
                          </Button>
                          
                          {request.status === 'pending' && (
                            <Button variant="destructive" size="sm">
                              Cancel Request
                            </Button>
                          )}
                          
                          {request.status === 'approved' && (
                            <Button variant="default" size="sm">
                              Mark as Returned
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Tips */}
        <Card className="bg-accent-soft">
          <CardHeader>
            <CardTitle className="text-lg">Request Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Be clear about when you need the item and for how long</li>
              <li>• Include a friendly message explaining your intended use</li>
              <li>• Respect the owner's response time - they'll get back to you soon</li>
              <li>• Always return items in the same condition you received them</li>
              <li>• Leave feedback to help build trust in the community</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MyRequests;