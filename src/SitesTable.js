import { useEffect, useState } from "react";
import { Pencil, Trash2, Save } from "lucide-react";
import { fetchSites, updateSite, deleteSite } from "./apiService";

export default function SitesTable() {
  const [sites, setSites] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", url: "", image: "", score: 0 });

  const loadSites = async () => {
    try {
      const data = await fetchSites();
      setSites(data);
    } catch (err) {
      console.error("Error fetching sites:", err);
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  const handleEdit = (site) => {
    setEditingId(site._id);
    setFormData(site);
  };

  const handleSave = async (id) => {
    try {
      const updatedData = {
        name: formData.name,
        url: formData.url,
        image: formData.image,
        score: Number(formData.score),
      };
      await updateSite(id, updatedData);
      setEditingId(null);
      loadSites();
    } catch (err) {
      console.error("Error updating site:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("האם את בטוחה שאת רוצה למחוק את האתר הזה?")) return;
    try {
      await deleteSite(id);
      loadSites();
    } catch (err) {
      console.error("Error deleting site:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">רשימת אתרים</h1>
      <table className="table-auto w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">תמונה</th>
            <th className="border px-4 py-2">שם</th>
            <th className="border px-4 py-2">כתובת</th>
            <th className="border px-4 py-2">ציון</th>
            <th className="border px-4 py-2">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site._id} className="text-center hover:bg-gray-100">
              <td className="border px-4 py-2">
                <img src={site.image} alt={site.name} className="w-16 h-16 object-cover mx-auto rounded" />
              </td>
              <td className="border px-4 py-2">
                {editingId === site._id ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  site.name
                )}
              </td>
              <td className="border px-4 py-2 text-blue-600 underline">
                {editingId === site._id ? (
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <a href={site.url} target="_blank" rel="noreferrer">
                    {site.url}
                  </a>
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === site._id ? (
                  <input
                    type="number"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    className="border rounded px-2 py-1 w-20"
                  />
                ) : (
                  site.score
                )}
              </td>
              <td className="border px-4 py-2 flex justify-center gap-3">
                {editingId === site._id ? (
                  <button
                    onClick={() => handleSave(site._id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Save />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(site)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(site._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

