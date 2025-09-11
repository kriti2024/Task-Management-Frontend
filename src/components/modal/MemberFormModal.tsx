import { useState, useEffect } from "react";
import { createMember, updateMember } from "@/services/member.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MemberFormProps {
  member?: any;
  onClose: () => void;
}

export default function MemberForm({ member, onClose }: MemberFormProps) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Member",
    image: "",
  });

  useEffect(() => {
    if (member) {
      setForm({
        username: member.username || "",
        email: member.email || "",
        password: "",
        role: member.role || "Member",
        image: member.image || "",
      });
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (member) {
        await updateMember(member.id, form);
      } else {
        await createMember(form);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save member. Please check the console for details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {member ? "Edit Member" : "Create Member"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          {!member && (
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          )}
          <Input
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <Input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{member ? "Update" : "Create"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
