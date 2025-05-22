
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlayCircle, PauseCircle, Clock, Plus, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const TimeTrackingTab = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [timeEntries, setTimeEntries] = useState<Array<{
    id: number;
    date: string;
    duration: string;
    description: string;
  }>>([
    {
      id: 1,
      date: "May 22, 2025",
      duration: "1h 30m",
      description: "Research and documentation review"
    },
    {
      id: 2,
      date: "May 21, 2025",
      duration: "2h 15m",
      description: "Client meeting and follow-up"
    }
  ]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const addTimeEntry = () => {
    const newEntry = {
      id: timeEntries.length + 1,
      date: "May 22, 2025",
      duration: "0h 0m",
      description: "New time entry"
    };
    setTimeEntries([newEntry, ...timeEntries]);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden border-none shadow-md">
          <CardHeader className="bg-gradient-to-r from-background to-muted/30 pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Time Tracker
              </span>
              <div className="text-lg font-mono bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm border">
                {isTracking ? "00:32:45" : "00:00:00"}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              <Textarea 
                placeholder="What are you working on?"
                className="resize-none h-20 shadow-sm focus-visible:ring-primary"
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <Button 
                  variant={isTracking ? "destructive" : "default"}
                  onClick={toggleTracking}
                  className="flex items-center gap-2 shadow hover:shadow-md transition-all w-full sm:w-auto"
                  size="sm"
                >
                  {isTracking ? (
                    <>
                      <PauseCircle className="h-4 w-4" />
                      Stop Tracking
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" />
                      Start Tracking
                    </>
                  )}
                </Button>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Started at {isTracking ? "10:45 AM" : "—"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Time Entries</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addTimeEntry} 
          className="flex items-center gap-1 shadow-sm hover:shadow transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-lg border shadow-sm overflow-hidden"
      >
        <table className="w-full case-table">
          <thead>
            <tr>
              <th className="bg-muted/40">Date</th>
              <th className="bg-muted/40">Description</th>
              <th className="text-right bg-muted/40">Duration</th>
              <th className="text-right bg-muted/40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.map((entry, index) => (
              <motion.tr 
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="hover:bg-muted/20"
              >
                <td>{entry.date}</td>
                <td>{entry.description}</td>
                <td className="text-right font-mono">{entry.duration}</td>
                <td className="text-right">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors">Edit</Button>
                </td>
              </motion.tr>
            ))}
            {timeEntries.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>No time entries yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default TimeTrackingTab;
