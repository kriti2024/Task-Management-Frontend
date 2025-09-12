import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  getMembers,
  updateMember,
  createMember,
} from "@/services/member.service";

export default function EditMemberPage() {
  const { id } = useParams(); // member ID from URL
  const navigate = useNavigate();

  const [member, setMember] = useState<any>(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "MEMBER",
    image: null as File | string | null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        if (id) {
          const data = await getMembers(1, 1000); // or use getMemberById(id)
          const found = data.users.find((u: any) => u.id === Number(id));
          if (found) {
            setMember(found);
            setForm({
              username: found.username,
              email: found.email,
              password: "",
              role: found.role,
              image: found.image || null,
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("role", form.role);

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      if (member) {
        await updateMember(member.id, formData);
      } else {
        await createMember(formData);
      }
      navigate("/members"); // go back to list
    } catch (err) {
      console.error("Error saving member:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (id && !member)
    return <p className="text-center mt-10">Member not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
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

        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="ADMIN">ADMIN</option>
          <option value="MEMBER">MEMBER</option>
        </select>
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
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit">{member ? "Update" : "Create"}</Button>
        </div>
      </form>
    </div>
  );
}
