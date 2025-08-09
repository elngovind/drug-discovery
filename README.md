# AI-Powered Drug-Drug Interaction Checker

**Created by:** Govind and Ermanno  
**Project Type:** AI Hackathon - Drug Discovery Application  
**Repository:** https://github.com/elngovind/drug-discovery  

## 🏥 Overview

A comprehensive AI-powered platform that prevents dangerous drug interactions by providing real-time safety assessments, side effect information, and alternative medication suggestions. Built with AWS serverless architecture and advanced machine learning capabilities.

## 🚀 Features

- **Real-time Interaction Checking**: Instant analysis of drug combinations with severity classifications
- **AI-Powered Explanations**: Natural language processing for personalized medical explanations
- **Comprehensive Side Effects**: Short-term and long-term effect information with monitoring guidance
- **Alternative Suggestions**: Safer medication alternatives when interactions are detected
- **Global Accessibility**: Multi-language support and international drug name recognition
- **Healthcare Integration**: API endpoints for EHR systems and mobile applications

## 🛠️ Technology Stack

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

### Frontend (Coming Soon)
- **React.js**: Responsive web application
- **Progressive Web App**: Mobile-optimized experience

## 📋 Project Structure

```
drug-discovery/
├── src/
│   ├── types/           # TypeScript interfaces and enums
│   ├── services/        # Business logic services
│   ├── handlers/        # Lambda function handlers
│   ├── utils/           # Utility functions
│   └── __tests__/       # Unit tests
├── infrastructure/      # AWS CDK infrastructure code
├── lambda-layers/       # Shared Lambda dependencies
└── docs/               # Documentation
```

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+ 
- AWS CLI configured
- AWS CDK CLI installed

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

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Deploy infrastructure**
   ```bash
   npm run deploy
   ```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

## 📊 Data Sources

- **DrugBank**: Comprehensive drug interaction database (13,000+ drugs)
- **FDA FAERS**: Adverse Event Reporting System for side effects
- **SIDER**: Side Effect Resource database
- **RxNorm**: Standardized medication nomenclature

## 🌍 Global Impact

This platform addresses a critical healthcare need:
- **125,000+ deaths annually** from preventable drug interactions in the US alone
- **95% of interactions are preventable** with proper screening
- **Global accessibility** for underserved healthcare systems
- **Open source** for worldwide collaboration

## 🤝 Contributing

We welcome contributions from the global healthcare and developer community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Goals

- [x] **Day 1-2**: Core platform and API development
- [ ] **Day 3**: AI features and frontend development  
- [ ] **Day 4**: Polish, optimization, and demo preparation

## 📞 Contact

- **Govind**: [@elngovind](https://github.com/elngovind)
- **Ermanno**: [GitHub Profile]

---

*Building technology that saves lives, one interaction at a time.* 💊🤖