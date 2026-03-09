# @davide/ui

A minimal & sharp React component library built with TypeScript.

> Crafted by [Davide Gomiero](https://github.com/yourusername) — Design Engineer.

---

## ✦ Philosophy

Clean borders. Generous whitespace. Zero visual noise.  
Every component is built with accessibility, type safety, and developer experience in mind.

---

## Components

| Component | Description |
|-----------|-------------|
| `Button`  | 4 variants, 3 sizes, loading state, icons |
| `Badge`   | Status indicators with dot support |
| `Input`   | Labels, hints, errors, left/right elements |
| `Modal`   | Accessible dialog with header/footer slots |
| `Toast`   | Context-based notifications with 4 types |
| `Tooltip` | 4 placements, keyboard accessible |

---

## Getting Started

```bash
npm install @davide/ui
```

Wrap your app with the `ToastProvider`:

```tsx
import { ToastProvider } from '@davide/ui';
import '@davide/ui/styles';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

### Usage examples

```tsx
import { Button, Badge, Input, Modal, Tooltip, useToast } from '@davide/ui';

// Button
<Button variant="primary" size="md">Save changes</Button>
<Button variant="danger" loading>Deleting...</Button>

// Badge
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning">Pending</Badge>

// Input
<Input label="Email" placeholder="you@example.com" hint="We'll never share your email." />
<Input label="Username" error="This username is already taken." />

// Modal
const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Confirm" footer={...}>
  Modal content here.
</Modal>

// Toast
const { addToast } = useToast();
addToast('Saved successfully!', { type: 'success' });

// Tooltip
<Tooltip content="More info" placement="top">
  <Button variant="ghost">Hover me</Button>
</Tooltip>
```

---

## Development

```bash
# Clone the repo
git clone https://github.com/yourusername/ui.git
cd ui

# Install dependencies
npm install

# Start Storybook
npm run dev

# Build the library
npm run build
```

---

## Design Tokens

All components use CSS custom properties defined in `src/tokens/tokens.css`.  
Override them at `:root` level to customize the look globally.

```css
:root {
  --color-primary: #2563EB;   /* Change accent color */
  --radius-md: 8px;           /* Rounder corners */
  --font-family: 'Your Font', sans-serif;
}
```

---

## License

MIT © Davide Gomiero
