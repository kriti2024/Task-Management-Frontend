import { useState } from "react";
import { createMember, updateMember } from "@/services/member.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MemberFormModal({ member, onClose }: any) {
  const [form, setForm] = useState({
    username: member?.username || "",
    email: member?.email || "",
    password: "",
    role: member?.role || "Member",
    image: member?.image || null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("role", form.role);

    if (!member && form.password) {
      formData.append("password", form.password);
    }

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      if (member) {
        await updateMember(member.id, formData);
      } else {
        await createMember(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
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
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.files ? e.target.files[0] : null,
              })
            }
          />
          {form.image && (
            <img
              src={
                form.image instanceof File
                  ? URL.createObjectURL(form.image)
                  : `${import.meta.env.VITE_API_URL}${form.image}`
              }
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover mt-2"
            />
          )}

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
