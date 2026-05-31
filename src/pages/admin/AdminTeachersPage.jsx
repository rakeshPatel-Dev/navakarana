import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  RiUserStarLine, RiAddLine, RiSearchLine, RiEditLine,
  RiDeleteBin7Line, RiLockLine, RiLockUnlockLine, RiMoneyDollarCircleLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import DeleteConfirmModal from "@/components/shared/DeleteConfirmModal";

const INITIAL_TEACHERS = [
  {
    uuid: "teacher-arjun",
    name: "Arjun Mehta",
    email: "arjun@navakarana.com",
    status: "active",
    is_locked: false,
    admin_free_access: false,
    free_access_reason: "",
    registeredAt: "2026-04-12T10:00:00Z"
  },
  {
    uuid: "teacher-sarah",
    name: "Sarah Connor",
    email: "sarah@navakarana.com",
    status: "active",
    is_locked: true,
    admin_free_access: true,
    free_access_reason: "Grandfathered beta registration promo",
    registeredAt: "2026-05-18T14:30:00Z"
  },
  {
    uuid: "teacher-david",
    name: "David Swenson",
    email: "david@swenson.com",
    status: "active",
    is_locked: true,
    admin_free_access: false,
    free_access_reason: "",
    registeredAt: "2026-05-01T08:00:00Z"
  },
  {
    uuid: "teacher-inactive",
    name: "John Doe",
    email: "john.doe@test.com",
    status: "inactive",
    is_locked: true,
    admin_free_access: false,
    free_access_reason: "",
    registeredAt: "2026-05-20T11:00:00Z"
  }
];

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [search, setSearch] = useState("");

  // Modals state
  const [formOpen, setFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [freeAccessOpen, setFreeAccessOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingUuid, setDeletingUuid] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [freeReason, setFreeReason] = useState("");
  const [formError, setFormError] = useState("");

  // Search Filter
  const filteredTeachers = useMemo(() => {
    return teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [teachers, search]);

  const handleOpenCreate = () => {
    setEditingTeacher(null);
    setName("");
    setEmail("");
    setFormError("");
    setFormOpen(true);
  };

  const handleOpenEdit = (teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setEmail(teacher.email);
    setFormError("");
    setFormOpen(true);
  };

  const handleSaveTeacher = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setFormError("Name and Email are required");
      return;
    }

    if (editingTeacher) {
      setTeachers((prev) =>
        prev.map((t) =>
          t.uuid === editingTeacher.uuid
            ? { ...t, name, email }
            : t
        )
      );
    } else {
      const newTeacher = {
        uuid: `teacher-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        status: "active",
        is_locked: true,
        admin_free_access: false,
        free_access_reason: "",
        registeredAt: new Date().toISOString()
      };
      setTeachers((prev) => [newTeacher, ...prev]);
    }
    setFormOpen(false);
  };

  const handleOpenFreeAccess = (teacher) => {
    setSelectedTeacher(teacher);
    setFreeReason(teacher.free_access_reason || "");
    setFreeAccessOpen(true);
  };

  const handleSaveFreeAccess = (e) => {
    e.preventDefault();
    setTeachers((prev) =>
      prev.map((t) =>
        t.uuid === selectedTeacher.uuid
          ? {
            ...t,
            admin_free_access: !selectedTeacher.admin_free_access,
            free_access_reason: !selectedTeacher.admin_free_access ? freeReason : ""
          }
          : t
      )
    );
    setFreeAccessOpen(false);
  };

  const handleToggleLock = (uuid) => {
    setTeachers((prev) =>
      prev.map((t) => (t.uuid === uuid ? { ...t, is_locked: !t.is_locked } : t))
    );
  };

  const handleOpenDelete = (uuid) => {
    setDeletingUuid(uuid);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    setTeachers((prev) => prev.filter((t) => t.uuid !== deletingUuid));
    setDeleteOpen(false);
  };

  const handleViewPayments = (name) => {
    alert(`Showing registration payments details for teacher: ${name}\nNo Stripe payments captured in mock.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 flex items-center gap-2">
            <RiUserStarLine /> Teacher Directory
          </h1>
          <p className="text-stone-500 text-xs mt-1">Add, edit, lock or unlock dashboard credentials, and grant free dashboard waivers.</p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-stone-900 hover:bg-stone-850 text-white font-bold h-10 px-4 rounded-xl gap-1.5 cursor-pointer self-start sm:self-auto text-xs"
        >
          <RiAddLine /> Add Teacher Account
        </Button>
      </div>

      {/* Filter Row */}
      <div className="relative w-full sm:w-72">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 size-4" />
        <Input
          placeholder="Search by name, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-white border-stone-200 rounded-xl h-10 text-xs text-stone-700"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500 font-bold border-b border-stone-100">
                <th className="p-4">Name / Email</th>
                <th className="p-4">Account Status</th>
                <th className="p-4">Dashboard Gate</th>
                <th className="p-4">Free Access Waiver</th>
                <th className="p-4">Registered Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.uuid} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-stone-850">{teacher.name}</p>
                      <p className="text-[10px] text-stone-450">{teacher.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    {teacher.status === "active" ? (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-250 rounded-md font-bold">
                        ACTIVE
                      </Badge>
                    ) : (
                      <Badge className="bg-stone-100 text-stone-500 border-stone-200 rounded-md font-semibold">
                        INACTIVE
                      </Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleLock(teacher.uuid)}
                      className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded border transition-colors cursor-pointer text-[10px] ${teacher.is_locked
                          ? "bg-red-50 text-red-700 border-red-100 hover:bg-red-100"
                          : "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
                        }`}
                    >
                      {teacher.is_locked ? (
                        <>
                          <RiLockLine className="size-3" /> Locked
                        </>
                      ) : (
                        <>
                          <RiLockUnlockLine className="size-3" /> Unlocked
                        </>
                      )}
                    </button>
                  </td>
                  <td className="p-4 font-semibold">
                    {teacher.admin_free_access ? (
                      <span className="text-emerald-600 flex items-center gap-1" title={teacher.free_access_reason}>
                        Granted Waiver
                      </span>
                    ) : (
                      <span className="text-stone-400 font-normal">—</span>
                    )}
                  </td>
                  <td className="p-4 text-stone-500 font-medium">
                    {new Date(teacher.registeredAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    {/* Grant Waiver */}
                    <Button
                      onClick={() => handleOpenFreeAccess(teacher)}
                      variant="outline"
                      className="border-stone-250 hover:bg-stone-50 text-stone-700 size-7 rounded-lg cursor-pointer"
                      title={teacher.admin_free_access ? "Revoke Waiver" : "Grant Waiver"}
                      size="icon"
                    >
                      <RiLockUnlockLine />
                    </Button>

                    {/* View Payments */}
                    <Button
                      onClick={() => handleViewPayments(teacher.name)}
                      variant="outline"
                      className="border-stone-250 hover:bg-stone-50 text-stone-700 size-7 rounded-lg cursor-pointer"
                      title="Registration Payments"
                      size="icon"
                    >
                      <RiMoneyDollarCircleLine />
                    </Button>

                    {/* Edit */}
                    <Button
                      onClick={() => handleOpenEdit(teacher)}
                      variant="outline"
                      className="border-stone-250 hover:bg-stone-50 text-stone-700 size-7 rounded-lg cursor-pointer"
                      title="Edit details"
                      size="icon"
                    >
                      <RiEditLine />
                    </Button>

                    {/* Delete */}
                    <Button
                      onClick={() => handleOpenDelete(teacher.uuid)}
                      variant="destructive"
                      className="size-7 rounded-lg cursor-pointer"
                      title="Delete account"
                      size="icon"
                    >
                      <RiDeleteBin7Line />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-sm bg-white p-6 rounded-3xl border border-stone-100 text-stone-900 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingTeacher ? "Edit Teacher details" : "Register Teacher Account"}
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-400 mt-1">
              Add credentials for instructors manually. Roles default to 'teacher'.
            </DialogDescription>
          </DialogHeader>

          {formError && <p className="text-brand text-xs font-semibold">{formError}</p>}

          <form onSubmit={handleSaveTeacher} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-stone-700 font-semibold text-xs">Instructor Full Name *</Label>
              <Input
                id="name"
                placeholder="Arjun Mehta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-stone-700 font-semibold text-xs">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="arjun@navakarana.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setFormOpen(false)}
                className="hover:bg-stone-50 rounded-xl font-semibold text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-stone-900 hover:bg-stone-850 text-white font-bold rounded-xl text-xs cursor-pointer px-4"
              >
                Save Account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Waiver Waiver dialog */}
      <Dialog open={freeAccessOpen} onOpenChange={setFreeAccessOpen}>
        <DialogContent className="max-w-sm bg-white p-6 rounded-3xl border border-stone-100 text-stone-900 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {selectedTeacher?.admin_free_access ? "Revoke Free Waiver" : "Grant Free Waiver"}
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-400 mt-1">
              Waiver bypasses the $49.00 registration requirement immediately.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveFreeAccess} className="space-y-4 pt-2">
            {!selectedTeacher?.admin_free_access && (
              <div className="space-y-1.5">
                <Label htmlFor="reason" className="text-stone-700 font-semibold text-xs">Exemption Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="e.g. Beta tester promotion..."
                  value={freeReason}
                  onChange={(e) => setFreeReason(e.target.value)}
                  className="bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-xs min-h-15"
                />
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setFreeAccessOpen(false)}
                className="hover:bg-stone-50 rounded-xl font-semibold text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-stone-900 hover:bg-stone-850 text-white font-bold rounded-xl text-xs cursor-pointer px-4"
              >
                {selectedTeacher?.admin_free_access ? "Revoke Exemption" : "Grant Exemption"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DeleteConfirmModal */}
      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Teacher Account"
        description="Are you absolutely sure? This will remove their teacher profile, channels, class schedules, and video recordings database history."
      />
    </div>
  );
}
