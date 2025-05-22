
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlayCircle, PauseCircle, Clock, Plus } from "lucide-react";

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
    <div className="p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Time Tracker</span>
            <div className="text-lg font-mono">
              {isTracking ? "00:32:45" : "00:00:00"}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="What are you working on?"
              className="resize-none h-20"
            />
            <div className="flex items-center justify-between">
              <Button 
                variant={isTracking ? "destructive" : "default"}
                onClick={toggleTracking}
                className="flex items-center gap-2"
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
              <div className="text-sm text-muted-foreground">
                Started at {isTracking ? "10:45 AM" : "—"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Time Entries</h2>
        <Button variant="outline" size="sm" onClick={addTimeEntry} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full case-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th className="text-right">Duration</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.description}</td>
                <td className="text-right">{entry.duration}</td>
                <td className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
            {timeEntries.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-muted-foreground">
                  <Clock className="h-6 w-6 mx-auto mb-2" />
                  <p>No time entries yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTrackingTab;
