# Frontend Development Guide

## Quick Start

### Start Development Server
```bash
npm run dev:frontend
```
The app will automatically open at `http://localhost:3000` with hot reload enabled.

### Available Scripts
```bash
npm run dev:frontend      # Start development server
npm run build:frontend    # Build for production
npm run build            # Build both frontend and backend
npm test                 # Run tests
```

## Project Structure

```
src/
├── components/          # React UI components
│   ├── Header.tsx       # Navigation and branding
│   ├── DrugSearchForm.tsx   # Multi-drug search interface
│   ├── InteractionResults.tsx  # Interaction warnings display
│   └── Footer.tsx       # Footer with links and disclaimers
├── context/
│   └── DrugContext.tsx  # Global state management
├── data/
│   └── mockData.ts      # Mock data for development
├── styles/
│   └── globals.css      # Global styles and Tailwind
├── types/               # Shared TypeScript interfaces
├── App.tsx             # Main application component
└── index.tsx           # React entry point
```

## Current Features ✅

### 1. Drug Search Interface
- **Multi-drug input** with autocomplete
- **Real-time search** as you type (2+ characters)
- **Keyboard navigation** (arrow keys, enter, escape)
- **Drug suggestions** with generic and brand names

### 2. Interaction Display
- **Real-time checking** when drugs are added
- **Severity color coding**:
  - 🔴 **Critical**: Red - Immediate medical attention
  - 🟠 **Major**: Orange - Significant risk
  - 🟡 **Moderate**: Yellow - Monitor closely
  - 🟢 **Minor**: Green - Low risk
- **Detailed explanations** with mechanisms and management

### 3. Responsive Design
- **Mobile-first** approach
- **Touch-friendly** interface
- **Progressive Web App** ready

## Mock Data Available

### Drugs
- **Warfarin** (anticoagulant)
- **Aspirin** (NSAID/antiplatelet)
- **Ibuprofen** (NSAID)
- **Metformin** (antidiabetic)
- **Lisinopril** (ACE inhibitor)

### Interactions
- **Warfarin + Aspirin**: MAJOR severity (bleeding risk)
- **Aspirin + Ibuprofen**: MODERATE severity (reduced cardioprotection)

## Testing the App

### Basic Workflow
1. **Start the app**: `npm run dev:frontend`
2. **Search for "warfarin"** - should show in dropdown
3. **Select warfarin** - should appear in selected medications
4. **Search for "aspirin"** - should show in dropdown
5. **Select aspirin** - should trigger MAJOR interaction warning

### Expected Behavior
- **Empty state**: Shows welcome message
- **Single drug**: Shows "add more medications" message
- **Multiple drugs**: Shows interaction analysis
- **No interactions**: Shows "No known interactions found"
- **With interactions**: Shows detailed warnings and explanations

## Development Tips

### Adding New Components
```typescript
// Create in src/components/NewComponent.tsx
import React from 'react';

const NewComponent: React.FC = () => {
  return (
    <div className="card">
      {/* Your component content */}
    </div>
  );
};

export default NewComponent;
```

### Using the Drug Context
```typescript
import { useDrugContext } from '../context/DrugContext';

const MyComponent: React.FC = () => {
  const { state, addDrug, removeDrug } = useDrugContext();
  
  // Access selected drugs: state.selectedDrugs
  // Access interactions: state.interactions
  // Add drug: addDrug(drugObject)
  // Remove drug: removeDrug(drugId)
};
```

### Styling Guidelines
- Use **Tailwind CSS** classes for styling
- Follow **medical-grade** design principles
- Use predefined **severity classes**:
  - `.severity-critical`
  - `.severity-major`
  - `.severity-moderate`
  - `.severity-minor`
- Use `.card` class for containers

## Next Steps

### Task 10: Enhanced Interaction Checking
- Add more visual warnings
- Implement confidence indicators
- Add interaction timing information

### Task 11: Detailed Explanations
- Expand clinical explanations
- Add monitoring guidance
- Include management strategies

### Task 12: Patient-Friendly Mode
- Simplified language toggle
- Clear emergency guidance
- Enhanced accessibility

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev:frontend
```

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build:frontend
```

**TypeScript errors:**
- Check import paths are correct
- Ensure all props are properly typed
- Use the shared types from `src/types/`

### Antivirus Issues
If your antivirus blocks PowerShell:
1. The app should still work in the browser
2. Add project folder to antivirus exclusions
3. Use `npm run build:frontend` instead of dev server if needed

## Integration with Backend

When Govind's APIs are ready:
1. Replace mock data imports with real API calls
2. Update the `DrugContext` to use React Query
3. Add error handling for API failures
4. Implement loading states

---

**Happy coding! 🚀**