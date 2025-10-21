import { useEffect, useState } from 'react';
import styles from './crud-menu.module.css';

type CrudMenuProps = {
  objectName: string;           // used to build API URLs and UI labels, e.g. "user" or "product"
  apiBase?: string;             // base path for the API, default "/api"
  idField?: string;             // field used as object id, default "id"
};

type Item = Record<string, any>;

export function CrudMenu({ objectName, apiBase = '/api', idField = 'id' }: CrudMenuProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>('create');
  const [current, setCurrent] = useState<Item | null>(null);
  const [jsonText, setJsonText] = useState<string>('{}');

  const baseUrl = `${apiBase.replace(/\/$/, '')}/${objectName.replace(/^\//, '')}`;

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectName, apiBase]);

  async function fetchItems() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(baseUrl, { method: 'GET' });
      if (!res.ok) throw new Error(`Failed to fetch ${objectName}: ${res.statusText}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setModalMode('create');
    setCurrent(null);
    setJsonText('{}');
    setModalOpen(true);
  }

  function openEdit(item: Item) {
    setModalMode('edit');
    setCurrent(item);
    setJsonText(JSON.stringify(item, null, 2));
    setModalOpen(true);
  }

  function openDelete(item: Item) {
    setModalMode('delete');
    setCurrent(item);
    setJsonText(JSON.stringify(item, null, 2));
    setModalOpen(true);
  }

  async function submit() {
    setError(null);
    let parsed: Item;
    try {
      parsed = JSON.parse(jsonText);
    } catch (err: any) {
      setError('Invalid JSON: ' + err?.message);
      return;
    }

    try {
      if (modalMode === 'create') {
        const res = await fetch(baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed),
        });
        if (!res.ok) throw new Error(`Create failed: ${res.statusText}`);
      } else if (modalMode === 'edit') {
        const id = current?.[idField];
        if (id === undefined) throw new Error(`Missing ${idField} for edit`);
        const res = await fetch(`${baseUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed),
        });
        if (!res.ok) throw new Error(`Update failed: ${res.statusText}`);
      } else if (modalMode === 'delete') {
        const id = current?.[idField];
        if (id === undefined) throw new Error(`Missing ${idField} for delete`);
        const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`Delete failed: ${res.statusText}`);
      }

      setModalOpen(false);
      await fetchItems();
    } catch (err: any) {
      setError(err?.message || 'Operation failed');
    }
  }

  return (
    <div className={styles.container}>
      <h2>{objectName.charAt(0).toUpperCase() + objectName.slice(1)} Manager</h2>

      <div>
        <button onClick={openCreate}>Add {objectName}</button>
        <button onClick={fetchItems} disabled={loading} style={{ marginLeft: 8 }}>
          Refresh
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {items.map((it, idx) => {
          const id = it[idField] ?? `idx-${idx}`;
          return (
            <li key={String(id)} style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(it, null, 2)}</pre>
                <div>
                  <button onClick={() => openEdit(it)}>Edit</button>
                  <button onClick={() => openDelete(it)} style={{ marginLeft: 8 }}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: 20,
              width: '90%',
              maxWidth: 800,
              maxHeight: '90%',
              overflow: 'auto',
              borderRadius: 6,
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              {modalMode === 'create' ? `Add ${objectName}` : modalMode === 'edit' ? `Edit ${objectName}` : `Delete ${objectName}`}
            </h3>

              <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', marginBottom: 4 }}>Object JSON</label>
              {/* TODO: Add onChange handler for textarea */}
              <textarea
                value={jsonText}
                rows={12}
                style={{ width: '100%', fontFamily: 'monospace' }}
                readOnly={modalMode === 'delete'}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              <button onClick={submit} style={{ background: modalMode === 'delete' ? '#c33' : undefined, color: modalMode === 'delete' ? 'white' : undefined }}>
                {modalMode === 'delete' ? 'Confirm Delete' : modalMode === 'edit' ? 'Save' : 'Create'}
              </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default CrudMenu;
