# AI Interview Preparation System - AIDLC demo prompts

## Phase 1: Inception

### Step 1.1:

```
Your Role: You are an expert product manager and are tasked with creating well defined user stories that becomes the contract for developing the system as mentioned in the Task section below.

Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: I would like to build an AI-powered interview preparation system. In this application, candidates upload their resumes and specify job requirements (position, seniority level, interview style). The AI analyzes the resume against job requirements, generates tailored technical interview questions across multiple categories (Core Knowledge, Practical Skills, Tools & Technology, Scenario-Based, Process & Best Practices), provides expected answers, evaluation criteria, and scoring guides. The system also calculates a resume-job match score and allows exporting questions as PDF.

Create an /inception/ directory and write the user stories to overview_user_stories.md in the inception directory. Only foucs on user stories and nothing else.
```

### Step 1.2:

```
Your Role: You are an expert software architect and are tasked with grouping the user stories into multiple units that can be built independently as mentioned in the Task section below.

Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Refer to the user stories in, /inception/overview_user_stories.md file. Group the user stories into multiple units that can be built independently. Each unit contains highly cohesive user stories that can be built by a single team. The units must be loosely coupled with each other. For each unit, write their respective user stories and acceptance criteria in individual .md files in the /inception/units/ folder. Do not start the technical systems design yet.
```

## Phase 2: Construction of one Unit

### Step 2.1:

```
Your Role: You are an expert software architect and are tasked with designing the domain model using Domain Driven Design for a unit of of the software system. Refer to the Task section for more details.

Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Focus only on the question generation and evaluation system.

Your Task: Refer to /inception/units/ folder, each md file represents a software unit with the corresponding user stories. Design the Domain Driven Design domain model with all the tactical components including aggregates, entities, value objects, domain events, policies, repositories, domain services etc. Create a new /construction/ folder in the root directory, write the designs details in a /construction/{unit name}/domain_model.md file.
```

### Step 2.2:

```
Your Role: You are an expert software architect and are tasked with creating a logical design of a highly scalable, event-driven system according to a Domain Driven Design domain model. Refer to the Task section for more details.

Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Focus only on the question generation and evaluation system.

Your Task: Refer to /construction/{unit name}/domain_model.md file for the domain model. Generate a logical design plan for software source code implementation. Write the plan to the /construction/{unit name}/logical_design.md file.
```

### Step 2.3:

```
Your Role: You are an expert software engineer and are tasked with implementing a highly scalable, event-driven system according to the Domain Driven Design logical design. Refer to the Task section for more details.

Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Focus only on the question generation and evaluation system.

Your Task: Refer to /construction/{unit name}/logical_design.md file for the logical design details. Generate a very simple and intuitive TypeScript/React implementation for the bounded context. Assume the data stores are in-memory or use mock services. Generate the components and services in respective individual files but keep them in the /construction/{unit name}/src/ directory based on the proposed file structure. Create a simple demo that can be run locally to verify the implementation.
```

### Step 2.4:

```
Your Role: You are an expert software engineer and are tasked with debugging issues with the demo application.

Resolve the issue below and any other issues to ensure that the demo script can be executed successfully.

Issue:

```

## Phase 3: Frontend UI/UX Design

### Step 3.1: UI/UX Design Analysis

```
Your Role: You are an expert UI/UX designer specializing in modern web applications with expertise in React, TypeScript, and TailwindCSS.

Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Design a comprehensive UI/UX strategy for the AI interview preparation system. Create wireframes and user flow diagrams for key user journeys: resume upload, job requirement specification, question generation, question review, and PDF export. Focus on accessibility, responsive design, and intuitive user experience. Document the design system including color palette, typography, spacing, and component patterns. Create the design documentation in /design/ui_ux_strategy.md file.
```

### Step 3.2: Mockup-Based Implementation

```
Your Role: You are an expert frontend developer with strong UI/UX skills, specializing in React, TypeScript, TailwindCSS, and modern component libraries.

Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: I will provide you with mockup images of the desired UI design. Analyze the mockups carefully and implement pixel-perfect React components using TypeScript and TailwindCSS. Pay attention to:
- Exact spacing, colors, and typography from the mockups
- Responsive behavior across different screen sizes
- Interactive states (hover, focus, active)
- Accessibility features (ARIA labels, keyboard navigation)
- Component reusability and maintainability

Create components in the /src/components/ directory following the existing project structure. Ensure all components are fully functional with proper TypeScript interfaces and follow React best practices.
```

### Step 3.3: Component Library Development

```
Your Role: You are an expert frontend developer specializing in building reusable component libraries with React, TypeScript, and TailwindCSS.

Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Based on the UI/UX strategy and mockup implementations, create a comprehensive component library for the interview preparation system. Include:
- Form components (file upload, input fields, dropdowns, buttons)
- Layout components (cards, containers, grids)
- Navigation components (tabs, breadcrumbs)
- Feedback components (alerts, loading states, progress indicators)
- Data display components (question cards, score displays, badges)

Each component should have proper TypeScript interfaces, documentation, and be fully accessible. Create a component showcase/storybook in /src/components/showcase/ to demonstrate all components and their variants.
```

### Step 3.4: Responsive Design Implementation

```
Your Role: You are an expert in responsive web design with deep knowledge of CSS Grid, Flexbox, and TailwindCSS responsive utilities.

Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Implement comprehensive responsive design for the interview preparation system. Ensure optimal user experience across:
- Mobile devices (320px - 768px)
- Tablets (768px - 1024px)
- Desktop (1024px+)
- Large screens (1440px+)

Focus on:
- Mobile-first approach with progressive enhancement
- Touch-friendly interface elements
- Readable typography at all screen sizes
- Efficient use of screen real estate
- Consistent navigation patterns

Test and document responsive behavior for all key pages and components.
```

## Phase 4: Mockup Reference Prompts

### Step 4.1: Mockup Analysis

```
Your Role: You are an expert UI/UX analyst with the ability to extract detailed design specifications from mockup images.

Analyze the provided mockup image(s) and create a comprehensive design specification document that includes:
- Layout structure and grid system
- Color palette with exact hex codes (if determinable)
- Typography hierarchy (font sizes, weights, line heights)
- Spacing and padding measurements
- Component identification and categorization
- Interactive element specifications
- Responsive design considerations

Create the analysis in /design/mockup_analysis.md with detailed descriptions that can guide implementation.
```

### Step 4.2: Mockup-to-Code Implementation

```
Your Role: You are an expert frontend developer who can translate design mockups into pixel-perfect React components.

Based on the mockup image(s) provided, implement the exact design using:
- React with TypeScript
- TailwindCSS for styling
- Proper component architecture
- Responsive design principles

Instructions:
1. Study the mockup carefully, noting every detail
2. Break down the design into reusable components
3. Implement each component with exact spacing, colors, and typography
4. Ensure the implementation matches the mockup as closely as possible
5. Add proper TypeScript interfaces and props
6. Include hover states and interactive behaviors where appropriate
7. Make the design responsive while maintaining the visual integrity

Provide the complete implementation with all necessary files and explain any assumptions made during the conversion process.
```

### Step 4.3: Design System Extraction

```
Your Role: You are a design systems expert who can extract and systematize design patterns from mockups.

From the provided mockup image(s), extract and document:
- Design tokens (colors, spacing, typography, shadows, borders)
- Component patterns and variations
- Layout patterns and grid systems
- Icon usage and style
- Button styles and states
- Form element designs
- Card and container patterns

Create a design system documentation in /design/design_system.md that can be used as a reference for consistent implementation across the entire application. Include TailwindCSS configuration recommendations based on the extracted design tokens.
```
