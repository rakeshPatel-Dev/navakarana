import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  RiGroupLine, RiSearchLine, RiEyeLine, RiUserAddLine, 
  RiUserFollowLine, RiUserSharedLine, RiCloseCircleLine 
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";

const MOCK_USERS = [
  { uuid: "student-uuid-1", name: "Jane Doe", email: "student@test.com", status: "active", registeredAt: "2026-05-30T10:00:00Z" },
  { uuid: "student-uuid-2", name: "Lucas Vance", email: "lucas@example.com", status: "active", registeredAt: "2026-05-24T14:22:00Z" },
  { uuid: "student-uuid-3", name: "Maria Garcia", email: "maria@example.com", status: "deactivated", registeredAt: "2026-05-18T11:05:00Z" },
  { uuid: "student-uuid-4", name: "David Chen", email: "david.chen@test.com", status: "active", registeredAt: "2026-05-15T09:12:00Z" },
  { uuid: "student-uuid-5", name: "Emma Watson", email: "emma@test.com", status: "active", registeredAt: "2026-05-01T15:30:00Z" }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Search Filter
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleToggleStatus = (uuid) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.uuid === uuid
          ? { ...u, status: u.status === "active" ? "deactivated" : "active" }
          : u
      )
    );
    // Update active modal display if currently shown
    if (selectedUser && selectedUser.uuid === uuid) {
      setSelectedUser((prev) => ({
        ...prev,
        status: prev.status === "active" ? "deactivated" : "active"
      }));
    }
  };

  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-2">
            <RiGroupLine /> Student Accounts
          </h1>
          <p className="text-muted-foreground text-xs mt-1">Review student registries, inspect profiles, and deactivate or reactivate access.</p>
        </div>
      </div>

      {/* Filter Row */}
      <div className="relative w-full sm:w-72">
        <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
        <Input
          placeholder="Search by name, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-background border border-border rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-background text-muted-foreground font-bold border-b border-border">
                <th className="p-4">Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Registered Date</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.uuid} className="hover:bg-background/50 transition-colors">
                  <td className="p-4 font-bold text-foreground">{user.name}</td>
                  <td className="p-4 text-muted-foreground font-medium">{user.email}</td>
                  <td className="p-4 text-muted-foreground font-medium">
                    {new Date(user.registeredAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {user.status === "active" ? (
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 rounded-md font-bold">
                        ACTIVE
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 rounded-md font-bold">
                        DEACTIVATED
                      </Badge>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    {/* View Details */}
                    <Button
                      onClick={() => handleViewDetail(user)}
                      variant="outline"
                      className="border-border hover:bg-background text-foreground size-7 rounded-lg cursor-pointer"
                      title="Inspect Profile"
                      size="icon"
                    >
                      <RiEyeLine />
                    </Button>

                    {/* Deactivate/Reactivate */}
                    <Button
                      onClick={() => handleToggleStatus(user.uuid)}
                      variant={user.status === "active" ? "destructive" : "outline"}
                      className={`size-7 rounded-lg cursor-pointer ${
                        user.status !== "active" ? "border-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/10" : ""
                      }`}
                      title={user.status === "active" ? "Deactivate User" : "Reactivate User"}
                      size="icon"
                    >
                      <RiCloseCircleLine />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile detail modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-sm bg-background p-6 rounded-3xl border border-border text-foreground shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Student Profile Details</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Platform registry database metadata inspector.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="bg-background border border-border p-4 rounded-2xl space-y-3 font-medium">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account UUID:</span>
                  <span className="text-foreground font-mono">{selectedUser.uuid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Full Name:</span>
                  <span className="text-foreground font-bold">{selectedUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email Address:</span>
                  <span className="text-foreground">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Role:</span>
                  <Badge variant="outline" className="border-border font-bold px-1.5 py-0 rounded text-[10px] uppercase text-muted-foreground">
                    student
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created At:</span>
                  <span className="text-muted-foreground">{new Date(selectedUser.registeredAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Status:</span>
                  <Badge className={selectedUser.status === "active" ? "bg-green-500/10 text-green-600 dark:text-green-400 border-transparent font-bold" : "bg-red-500/10 text-red-600 dark:text-red-400 border-transparent font-bold"}>
                    {selectedUser.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <DialogFooter className="pt-2 gap-2 flex-col sm:flex-row">
                <Button
                  onClick={() => handleToggleStatus(selectedUser.uuid)}
                  variant={selectedUser.status === "active" ? "destructive" : "outline"}
                  className={`w-full sm:w-auto h-10 rounded-xl font-bold cursor-pointer text-xs ${
                    selectedUser.status !== "active" ? "border-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/10" : ""
                  }`}
                >
                  {selectedUser.status === "active" ? "Deactivate Account" : "Reactivate Account"}
                </Button>
                <Button
                  onClick={() => setDetailOpen(false)}
                  variant="ghost"
                  className="w-full sm:w-auto h-10 hover:bg-background rounded-xl font-semibold text-muted-foreground text-xs"
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
