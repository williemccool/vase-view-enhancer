import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, ExternalLink, Filter, Book, Scale } from 'lucide-react';
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
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Scale className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Bare Acts Search
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover Central and State bare acts with intelligent fuzzy search. 
              Find the legal documents you need instantly.
            </p>
            
            {/* Search Interface */}
            <div className="bg-card rounded-2xl shadow-lg border p-8 max-w-3xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search acts by name, keywords, or subject..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-12 h-14 text-base border-0 bg-muted/30 focus:bg-background transition-colors rounded-xl"
                  />
                </div>
                <Button 
                  onClick={handleSearch} 
                  disabled={loading}
                  size="lg"
                  className="h-14 px-8 rounded-xl font-semibold"
                >
                  {loading ? (
                    <>Searching...</>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">Filters:</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <Select value={scope} onValueChange={setScope}>
                    <SelectTrigger className="h-11 rounded-lg border-muted-foreground/20">
                      <SelectValue placeholder="All Jurisdictions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Acts</SelectItem>
                      <SelectItem value="central">Central Acts</SelectItem>
                      <SelectItem value="state">State Acts</SelectItem>
                    </SelectContent>
                  </Select>

                  {scope === 'state' && (
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="h-11 rounded-lg border-muted-foreground/20">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {formatStateName(state)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Loading Skeleton */}
          {loading && results.length === 0 && (
            <div className="grid gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="hover-lift rounded-xl border-0 shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <Skeleton className="h-12 w-12 rounded-full" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-6 w-4/5" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-20 rounded-full" />
                          <Skeleton className="h-6 w-16 rounded-full" />
                          <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-10 w-28 rounded-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Search Results
                  </h2>
                  <p className="text-muted-foreground">
                    {totalCount} acts found • Page {page}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                  Showing {results.length} of {totalCount} results
                </div>
              </div>

              <div className="grid gap-6">
                {results.map((act, index) => (
                  <Card key={`${act.url}-${index}`} className="hover-lift rounded-xl border-0 shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Book className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                            {act.title}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge 
                              variant={act.type === 'central' ? 'default' : 'secondary'}
                              className="px-3 py-1 text-xs font-medium rounded-full"
                            >
                              {act.type === 'central' ? 'Central Act' : 'State Act'}
                            </Badge>
                            
                            {act.year && (
                              <Badge variant="outline" className="px-3 py-1 text-xs rounded-full">
                                {act.year}
                              </Badge>
                            )}
                            
                            {act.state && (
                              <Badge variant="outline" className="px-3 py-1 text-xs rounded-full">
                                {formatStateName(act.state)}
                              </Badge>
                            )}
                            
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                              {Math.round(act.score * 100)}% match
                            </div>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <Button
                            onClick={() => window.open(act.url, '_blank')}
                            className="h-11 px-6 rounded-lg font-semibold"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View PDF
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-8">
                  <Button
                    onClick={handleLoadMore}
                    disabled={loading}
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 rounded-xl"
                  >
                    {loading ? (
                      <>Loading more results...</>
                    ) : (
                      <>
                        Load More Results
                        <Search className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && query && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">No Acts Found</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We couldn't find any acts matching "{query}". Try different keywords or adjust your filters to discover relevant legal documents.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {setQuery(''); setResults([]);}}
                    className="rounded-lg"
                  >
                    Clear Search
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {setScope('all'); setSelectedState('');}}
                    className="rounded-lg"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Welcome State */}
          {!loading && results.length === 0 && !query && (
            <div className="text-center py-16">
              <div className="max-w-lg mx-auto">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Search</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Enter keywords above to search through thousands of Central and State bare acts. 
                  Our intelligent fuzzy search will help you find the most relevant legal documents.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BareActsSearch;