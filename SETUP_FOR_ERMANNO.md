# Setup Guide for Ermanno

Welcome to the Drug-Drug Interaction Checker project! Here's everything you need to get started.

## Quick Start

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/elngovind/drug-discovery.git
cd drug-discovery

# Install dependencies (you'll need Node.js 18+)
npm install

# Create your development branch
git checkout -b frontend/ermanno
```

### 2. Development Environment
```bash
# Install required tools
npm install -g @aws-cdk/cli
npm install -g typescript

# Verify setup
npm run build
npm test
```

### 3. Your Focus Areas

#### Primary Responsibilities
- **Frontend Development**: React.js application
- **User Interface**: Clean, medical-grade UI/UX
- **AI Integration**: Natural language processing features
- **Mobile Optimization**: Responsive design

#### Your Task List
- [x] Task 9: React frontend with drug input interface ✅ COMPLETED
- [ ] Task 10: Real-time interaction checking with visual warnings
- [ ] Task 11: Detailed explanation and monitoring guidance
- [ ] Task 12: Patient-friendly mode with simplified language
- [ ] Task 18: Natural language query processing
- [ ] Task 19: AI-powered explanation generation
- [ ] Task 20: Conversational interface

## Project Structure (Your Focus)

```
drug-discovery/
├── src/
│   ├── components/          # React components (YOU CREATE)
│   │   ├── DrugSearch/
│   │   ├── InteractionDisplay/
│   │   ├── SideEffects/
│   │   └── ChatInterface/
│   ├── pages/              # React pages (YOU CREATE)
│   ├── hooks/              # Custom React hooks (YOU CREATE)
│   ├── utils/              # Frontend utilities (YOU CREATE)
│   └── types/              # TypeScript types (SHARED)
├── public/                 # Static assets (YOU CREATE)
└── package.json           # Dependencies (SHARED)
```

## API Endpoints (Govind is building these)

### Available APIs (will be ready by Day 2)
```typescript
// Drug search
GET /api/v1/drugs/search?q={drugName}

// Check interactions
POST /api/v1/interactions/check
Body: { drugs: [{ name: "warfarin" }, { name: "aspirin" }] }

// Get side effects
GET /api/v1/drugs/{drugId}/effects

// Natural language query (Day 3)
POST /api/v1/query/natural
Body: { query: "Can I take ibuprofen with blood thinners?" }
```

## Design Guidelines

### UI/UX Principles
- **Medical Grade**: Clean, professional, trustworthy
- **Color Coding**: Red (Critical), Orange (Major), Yellow (Moderate), Green (Safe)
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile First**: Responsive design for all devices

### Component Architecture
```
App
├── Header (Navigation, Logo)
├── DrugSearchForm (Multi-drug input)
├── InteractionResults (Warnings, Explanations)
├── SideEffectsPanel (Timeline-based display)
├── AlternativeSuggestions (Safer options)
├── ChatInterface (AI-powered Q&A)
└── Footer (Credits, Links)
```

## Development Workflow

### Daily Routine
1. **Morning**: Pull latest changes from main
2. **Development**: Work on your assigned tasks
3. **Testing**: Test your components thoroughly
4. **Evening**: Push your changes, update team

### Git Workflow
```bash
# Start each day
git checkout main
git pull origin main
git checkout frontend/ermanno
git merge main

# Start development server
npm run dev:frontend
# App will open at http://localhost:3000

# During development
git add .
git commit -m "feat(frontend): add drug search component"
git push origin frontend/ermanno

# When ready for integration
# Create Pull Request on GitHub
```

## Mock Data for Development

While Govind builds the APIs, use this mock data:

```typescript
// Mock drug data
const mockDrugs = [
  { id: "1", name: "Warfarin", genericName: "warfarin" },
  { id: "2", name: "Aspirin", genericName: "acetylsalicylic acid" },
  { id: "3", name: "Ibuprofen", genericName: "ibuprofen" }
];

// Mock interaction data
const mockInteraction = {
  severity: "MAJOR",
  confidence: 0.95,
  mechanism: "Increased bleeding risk",
  clinicalEffects: ["Bruising", "GI bleeding"],
  management: "Monitor INR closely"
};
```

## Technology Stack (Your Part)

### Frontend Technologies
- **React 18**: Component framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **React Query**: API state management
- **React Hook Form**: Form handling
- **Framer Motion**: Animations
- **React Testing Library**: Component testing

### Recommended Libraries
```bash
npm install react react-dom @types/react @types/react-dom
npm install tailwindcss @tailwindcss/forms @tailwindcss/typography
npm install @tanstack/react-query axios
npm install react-hook-form @hookform/resolvers
npm install framer-motion lucide-react
npm install @testing-library/react @testing-library/jest-dom
```

## Key Features to Implement

### 1. Drug Search Interface
- Multi-drug input with autocomplete
- Drug name validation and suggestions
- Clear visual feedback for selections

### 2. Interaction Display
- Color-coded severity warnings
- Expandable explanations
- Management recommendations
- Evidence sources

### 3. AI Chat Interface
- Natural language input
- Conversational responses
- Context preservation
- User-friendly explanations

### 4. Mobile Optimization
- Touch-friendly interface
- Responsive layouts
- Fast loading times
- Offline capability (basic)

## Communication

### With Govind
- **API Questions**: Ask about endpoint specifications
- **Data Format**: Confirm response structures
- **Integration**: Coordinate testing and deployment

### Progress Updates
- Daily commits with clear messages
- Comment on GitHub issues
- Share screenshots of UI progress
- Report any blockers immediately

## Success Metrics

### Technical Goals
- [ ] All components render without errors
- [ ] Mobile responsive on all screen sizes
- [ ] <2 second page load times
- [ ] Accessible to screen readers
- [ ] 90%+ component test coverage

### User Experience Goals
- [ ] Intuitive drug input process
- [ ] Clear interaction warnings
- [ ] Easy-to-understand explanations
- [ ] Professional medical appearance
- [ ] Smooth AI conversation flow

---

**Ready to build something amazing!** 🚀

Contact Govind for any questions or clarifications. Let's create a platform that saves lives!