import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

interface BareAct {
  title: string;
  url: string;
  type: 'central' | 'state';
  state: string | null;
  year: number;
  bucket: string;
  score: number;
}

interface SearchResponse {
  query: string;
  scope: string;
  state: string | null;
  page: number;
  perPage: number;
  count: number;
  hasMore: boolean;
  results: BareAct[];
}

const BareActsSearch = () => {
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState('all');
  const [selectedState, setSelectedState] = useState('');
  const [results, setResults] = useState<BareAct[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const states = [
    'andhra-pradesh', 'arunachal-pradesh', 'assam', 'bihar', 'chhattisgarh',
    'goa', 'gujarat', 'haryana', 'himachal-pradesh', 'jharkhand', 'karnataka',
    'kerala', 'madhya-pradesh', 'maharashtra', 'manipur', 'meghalaya', 'mizoram',
    'nagaland', 'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil-nadu',
    'telangana', 'tripura', 'uttar-pradesh', 'uttarakhand', 'west-bengal'
  ];

  const searchBareActs = async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery || searchQuery.length < 2) {
      toast({
        title: "Search Error",
        description: "Please enter at least 2 characters to search",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        scope,
        page: pageNum.toString(),
        per_page: '20'
      });

      if (scope === 'state' && selectedState) {
        params.append('state', selectedState);
      }

      const response = await fetch(`/api/bareacts/search?${params}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: SearchResponse = await response.json();
      
      if (pageNum === 1) {
        setResults(data.results);
      } else {
        setResults(prev => [...prev, ...data.results]);
      }
      
      setHasMore(data.hasMore);
      setTotalCount(data.count);
      setPage(pageNum);
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search bare acts. Please try again.",
        variant: "destructive"
      });
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      setPage(1);
      searchBareActs(query.trim(), 1);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      searchBareActs(query.trim(), page + 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatStateName = (stateSlug: string) => {
    return stateSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  useEffect(() => {
    if (scope !== 'state') {
      setSelectedState('');
    }
  }, [scope]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Bare Acts Search</h1>
            <p className="text-muted-foreground">
              Search through Central and State bare acts using advanced fuzzy matching
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Bare Acts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter act name, keywords, or subject..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-base"
                  />
                </div>
                <Button onClick={handleSearch} disabled={loading}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Select value={scope} onValueChange={setScope}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Acts</SelectItem>
                      <SelectItem value="central">Central Acts</SelectItem>
                      <SelectItem value="state">State Acts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {scope === 'state' && (
                  <div className="flex-1">
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {formatStateName(state)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Loading Skeleton */}
          {loading && results.length === 0 && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Search Results ({totalCount} found)
                </h2>
                <div className="text-sm text-muted-foreground">
                  Page {page} • Showing {results.length} results
                </div>
              </div>

              {results.map((act, index) => (
                <Card key={`${act.url}-${index}`} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {act.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant={act.type === 'central' ? 'default' : 'secondary'}>
                            {act.type === 'central' ? 'Central' : 'State'}
                          </Badge>
                          
                          {act.year && (
                            <Badge variant="outline">
                              {act.year}
                            </Badge>
                          )}
                          
                          {act.state && (
                            <Badge variant="outline">
                              {formatStateName(act.state)}
                            </Badge>
                          )}
                          
                          <div className="text-sm text-muted-foreground">
                            Match: {Math.round(act.score * 100)}%
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(act.url, '_blank')}
                        className="shrink-0"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View PDF
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={handleLoadMore}
                    disabled={loading}
                    variant="outline"
                  >
                    {loading ? (
                      <>Loading...</>
                    ) : (
                      <>
                        Load More Results
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && query && (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BareActsSearch;