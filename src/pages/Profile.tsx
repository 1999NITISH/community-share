import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Star, Package, Heart, Award, Edit, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';

interface UserProfile {
  userId: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  joinDate: string;
  trustScore: number;
  lendingCount: number;
  borrowingCount: number;
  positiveFeedback: number;
  avatar: string;
}

interface Activity {
  id: string;
  type: 'lent' | 'borrowed';
  itemName: string;
  partnerName: string;
  date: string;
  status: 'active' | 'completed' | 'pending';
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    userId: "usr123",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    location: "Block A, Sector 45",
    bio: "Friendly neighbor who loves sharing tools and helping the community. I believe in sustainable living and building strong neighborhood connections.",
    joinDate: "2024-01-01",
    trustScore: 9.5,
    lendingCount: 7,
    borrowingCount: 2,
    positiveFeedback: 97,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  const [editForm, setEditForm] = useState(profile);

  const mockActivities: Activity[] = [
    {
      id: "act001",
      type: "lent",
      itemName: "Cordless Drill",
      partnerName: "John Smith",
      date: "2024-01-20",
      status: "active"
    },
    {
      id: "act002",
      type: "borrowed",
      itemName: "Camping Tent",
      partnerName: "Brian Lee",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "act003",
      type: "lent",
      itemName: "Yoga Mat",
      partnerName: "Sarah Wilson",
      date: "2024-01-10",
      status: "completed"
    }
  ];

  const handleSaveProfile = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const getTrustBadge = (score: number) => {
    if (score >= 9) return { text: "Excellent", variant: "default" as const, color: "bg-primary" };
    if (score >= 7) return { text: "Good", variant: "secondary" as const, color: "bg-accent" };
    if (score >= 5) return { text: "Fair", variant: "outline" as const, color: "bg-secondary" };
    return { text: "New", variant: "outline" as const, color: "bg-muted" };
  };

  const trustBadge = getTrustBadge(profile.trustScore);

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

        {/* Profile Header */}
        <Card className="bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-card"
                />
                <div className="absolute -bottom-2 -right-2">
                  <div className={`w-8 h-8 rounded-full ${trustBadge.color} flex items-center justify-center`}>
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                      <Badge variant={trustBadge.variant} className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{trustBadge.text}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mt-2">{profile.bio}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile} variant="default">
                      Save Changes
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {profile.trustScore}
              </div>
              <div className="text-sm text-muted-foreground">Trust Score</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {profile.lendingCount}
              </div>
              <div className="text-sm text-muted-foreground">Items Lent</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {profile.borrowingCount}
              </div>
              <div className="text-sm text-muted-foreground">Items Borrowed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {profile.positiveFeedback}%
              </div>
              <div className="text-sm text-muted-foreground">Positive Feedback</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${activity.type === 'lent' ? 'bg-primary' : 'bg-accent'}`}>
                      {activity.type === 'lent' ? (
                        <Heart className="h-4 w-4 text-white" />
                      ) : (
                        <Package className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {activity.type === 'lent' ? 'Lent' : 'Borrowed'} {activity.itemName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.type === 'lent' ? 'to' : 'from'} {activity.partnerName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={activity.status === 'active' ? 'default' : 
                               activity.status === 'completed' ? 'secondary' : 'outline'}
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trust & Safety */}
        <Card className="bg-accent-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Trust & Safety</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Account Verified</span>
                <Badge variant="default">
                  <span>✓ Verified</span>
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Member Since</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(profile.joinDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Rate</span>
                <span className="text-sm text-muted-foreground">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;