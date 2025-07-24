import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useItems } from '@/context/ItemsContext';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  description: string;
  category: string;
  condition: string;
  owner: string;
  image: string;
}

interface FormErrors {
  [key: string]: string;
}

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useItems();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    category: '',
    condition: '',
    owner: '',
    image: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Tools',
    'Kitchen',
    'Outdoors',
    'Fitness',
    'Games',
    'Electronics',
    'Books',
    'Garden',
    'Cleaning',
    'Other'
  ];

  const conditions = [
    'Like New',
    'Excellent',
    'Very Good',
    'Good',
    'Fair'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }

    if (!formData.owner.trim()) {
      newErrors.owner = 'Your name is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else {
      // Basic URL validation
      try {
        new URL(formData.image);
      } catch {
        newErrors.image = 'Please enter a valid image URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      try {
        addItem({
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: formData.category,
          condition: formData.condition,
          owner: formData.owner.trim(),
          image: formData.image.trim()
        });

        toast({
          title: "Item added successfully!",
          description: `"${formData.name}" has been added to the community catalog.`,
        });

        // Reset form
        setFormData({
          name: '',
          description: '',
          category: '',
          condition: '',
          owner: '',
          image: ''
        });

        // Navigate to catalog after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1500);

      } catch (error) {
        toast({
          title: "Error adding item",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
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
              <Plus className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Share an Item</h1>
          <p className="text-muted-foreground">
            Help build your community by sharing items your neighbors can borrow
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Cordless Drill, Camping Tent"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item, its condition, and any important details..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Category and Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select 
                    value={formData.condition} 
                    onValueChange={(value) => handleInputChange('condition', value)}
                  >
                    <SelectTrigger className={errors.condition ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.condition && (
                    <p className="text-sm text-destructive">{errors.condition}</p>
                  )}
                </div>
              </div>

              {/* Owner Name */}
              <div className="space-y-2">
                <Label htmlFor="owner">Your Name *</Label>
                <Input
                  id="owner"
                  placeholder="Your full name"
                  value={formData.owner}
                  onChange={(e) => handleInputChange('owner', e.target.value)}
                  className={errors.owner ? 'border-destructive' : ''}
                />
                {errors.owner && (
                  <p className="text-sm text-destructive">{errors.owner}</p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image">Image URL *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className={errors.image ? 'border-destructive' : ''}
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {errors.image && (
                  <p className="text-sm text-destructive">{errors.image}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Provide a clear photo URL of your item
                </p>
              </div>

              {/* Image Preview */}
              {formData.image && !errors.image && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="w-32 h-32 rounded-lg overflow-hidden border border-border">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        setErrors(prev => ({ ...prev, image: 'Invalid image URL' }));
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                  variant="cta"
                >
                  {isSubmitting ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2 animate-spin" />
                      Adding Item...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item to Community
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-accent-soft">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">Tips for a Great Listing</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use a clear, well-lit photo of your item</li>
              <li>• Describe the condition honestly</li>
              <li>• Include any important details or limitations</li>
              <li>• Consider how long you're willing to lend the item</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddItem;