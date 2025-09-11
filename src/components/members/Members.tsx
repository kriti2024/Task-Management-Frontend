import { useEffect, useState, useCallback } from "react";
import { getMembers, deleteMember } from "@/services/member.service";
import type { Member } from "@/services/member.service";
import MemberRow from "./MemberRow";
import MemberForm from "../modal/MemberFormModal";
import ViewMemberModal from "../modal/ViewMemberModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [viewMember, setViewMember] = useState<Member | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMembers(page, perPage, search, from, to);
      setMembers(data.users || []);
      setTotalPages(Math.max(1, Math.ceil(data.total / perPage)));
    } catch (err) {
      console.error("Failed to fetch members:", err);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, search, from, to]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure to delete this member?")) return;
    await deleteMember(id);
    if (members.length === 1 && page > 1) {
      setPage((p) => p - 1);
    } else {
      fetchMembers();
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search by name/email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <Input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowForm(true)}>+ Create Member</Button>
      </div>

      {/* Members Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : members.length > 0 ? (
            members.map((m) => (
              <MemberRow
                key={m.id}
                member={m}
                onDelete={handleDelete}
                onEdit={() => {
                  setEditMember(m);
                  setShowForm(true);
                }}
                onView={() => setViewMember(m)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Modals */}
      {showForm && (
        <MemberForm
          member={editMember}
          onClose={() => {
            setShowForm(false);
            setEditMember(null);
            fetchMembers();
          }}
        />
      )}
      {viewMember && (
        <ViewMemberModal
          member={viewMember}
          onClose={() => setViewMember(null)}
        />
      )}
    </div>
  );
}
