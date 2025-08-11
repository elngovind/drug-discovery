# AI-Powered Drug-Drug Interaction Checker

**Created by:** Govind and Ermanno  
**Project Type:** AI Hackathon - Drug Discovery Application  
**Repository:** https://github.com/elngovind/drug-discovery  

## Overview

A comprehensive AI-powered platform that prevents dangerous drug interactions by providing real-time safety assessments, side effect information, and alternative medication suggestions. Built with AWS serverless architecture and advanced machine learning capabilities.

## Features

- **Real-time Interaction Checking**: Instant analysis of drug combinations with severity classifications
- **AI-Powered Explanations**: Natural language processing for personalized medical explanations
- **Comprehensive Side Effects**: Short-term and long-term effect information with monitoring guidance
- **Alternative Suggestions**: Safer medication alternatives when interactions are detected
- **Global Accessibility**: Multi-language support and international drug name recognition
- **Healthcare Integration**: API endpoints for EHR systems and mobile applications

## Technology Stack

### Backend
- **Node.js + TypeScript**: Type-safe server-side development
- **AWS Lambda**: Serverless compute for auto-scaling
- **Amazon DynamoDB**: Fast NoSQL database for drug interactions
- **Amazon Bedrock**: LLM integration for natural language processing
- **AWS Comprehend Medical**: Medical entity extraction

### Infrastructure
- **AWS CDK**: Infrastructure as Code
- **Amazon API Gateway**: RESTful API management
- **Amazon CloudFront**: Global content delivery
- **Amazon S3**: Data storage and static assets

### Frontend
- **React.js + TypeScript**: Responsive web application with type safety
- **Tailwind CSS**: Medical-grade styling with severity color coding
- **React Query**: Efficient API state management
- **Progressive Web App**: Mobile-optimized experience
- **Webpack**: Modern build tooling and development server

## Project Structure

```
drug-discovery/
├── src/
│   ├── components/      # React UI components
│   │   ├── Header.tsx
│   │   ├── DrugSearchForm.tsx
│   │   ├── InteractionResults.tsx
│   │   └── Footer.tsx
│   ├── context/         # React context providers
│   ├── data/            # Mock data and API utilities
│   ├── styles/          # CSS and styling
│   ├── types/           # TypeScript interfaces and enums
│   ├── services/        # Business logic services (Backend)
│   ├── handlers/        # Lambda function handlers (Backend)
│   ├── utils/           # Utility functions
│   └── __tests__/       # Unit tests
├── public/              # Static assets
├── infrastructure/      # AWS CDK infrastructure code
├── lambda-layers/       # Shared Lambda dependencies
└── docs/               # Documentation
```

## Development Setup

### Prerequisites
- Node.js 18+ 
- AWS CLI configured (for backend deployment)
- AWS CDK CLI installed (for infrastructure)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/elngovind/drug-discovery.git
   cd drug-discovery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start frontend development server**
   ```bash
   npm run dev:frontend
   ```
   This will start the React development server at `http://localhost:3000`

4. **Build the project**
   ```bash
   # Build both frontend and backend
   npm run build
   
   # Build only frontend
   npm run build:frontend
   
   # Build only backend
   npm run build:backend
   ```

5. **Run tests**
   ```bash
   npm test
   ```

6. **Deploy infrastructure** (Backend only)
   ```bash
   npm run deploy
   ```

### Development Workflow

#### Frontend Development (Ermanno)
```bash
# Start the development server with hot reload
npm run dev:frontend

# The app will open at http://localhost:3000
# Changes to React components will auto-reload
```

#### Backend Development (Govind)
```bash
# Start the backend development server
npm run dev

# Build TypeScript backend code
npm run build:backend
```

#### Full Stack Development
```bash
# Install all dependencies
npm install

# Start frontend (Terminal 1)
npm run dev:frontend

# Start backend (Terminal 2) 
npm run dev

# Both will run simultaneously for full-stack development
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

## Frontend Features

### Current Implementation ✅
- **Responsive Drug Search**: Multi-drug input with autocomplete
- **Real-time Interaction Checking**: Instant analysis with mock data
- **Severity Classifications**: Color-coded warnings (Critical, Major, Moderate, Minor)
- **Medical-Grade UI**: Professional healthcare interface design
- **Mobile Responsive**: Optimized for all device sizes
- **Alternative Suggestions**: Safer medication recommendations

### Demo Instructions
1. Start the frontend: `npm run dev:frontend`
2. Search for medications: "warfarin", "aspirin", "ibuprofen"
3. Add multiple drugs to see interaction warnings
4. Test the responsive design on different screen sizes

### Mock Data Available
- **5 sample medications** with complete drug information
- **2 interaction scenarios** (Warfarin + Aspirin, Aspirin + Ibuprofen)
- **Severity levels** and confidence scores
- **Clinical explanations** and management guidance

## Data Sources

- **DrugBank**: Comprehensive drug interaction database (13,000+ drugs)
- **FDA FAERS**: Adverse Event Reporting System for side effects
- **SIDER**: Side Effect Resource database
- **RxNorm**: Standardized medication nomenclature

## Global Impact

This platform addresses a critical healthcare need:
- **125,000+ deaths annually** from preventable drug interactions in the US alone
- **95% of interactions are preventable** with proper screening
- **Global accessibility** for underserved healthcare systems
- **Open source** for worldwide collaboration

## Contributing

We welcome contributions from the global healthcare and developer community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Hackathon Progress

### Day 1-2: Foundation ✅
- [x] **Project Infrastructure**: TypeScript, AWS CDK, core data models
- [x] **Frontend Foundation**: React app with responsive design
- [x] **Drug Search Interface**: Multi-drug input with autocomplete
- [x] **Interaction Display**: Real-time checking with visual warnings
- [ ] **Backend APIs**: Drug database and interaction engine (In Progress - Govind)

### Day 3: Integration & AI Features
- [ ] **API Integration**: Connect frontend to real backend services
- [ ] **Natural Language Processing**: AI-powered query understanding
- [ ] **AI Explanations**: Personalized interaction explanations
- [ ] **Conversational Interface**: Chat-like drug interaction queries

### Day 4: Polish & Demo
- [ ] **Performance Optimization**: Caching and response times
- [ ] **Mobile Polish**: Enhanced mobile experience
- [ ] **Demo Preparation**: Presentation materials and scenarios

## Contact

- **Govind**: [@elngovind](https://github.com/elngovind)
- **Ermanno**: [GitHub Profile]

---

*Building technology that saves lives, one interaction at a time.*