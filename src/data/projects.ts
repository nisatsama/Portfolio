export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  type: "client" | "service" | "database" | "queue" | "sandbox" | "external";
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label: string;
  protocol?: string;
}

export interface ArchitectureDiagram {
  type: "pipeline" | "distributed" | "client-server" | "event-driven";
  description: string;
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
  flowSteps: string[];
}

export interface ProjectTechStack {
  languageAndFramework: string[];
  databaseAndMessaging: string[];
  infrastructureAndTesting: string[];
  all: string[];
}

export interface EngineeringNotes {
  title: string;
  description: string;
  architecturalPatterns: string[];
  dataFlow: string[];
  concurrencyAndConsistency: string[];
  securityImplementation: string[];
  failureHandling: string[];
  designTradeoffs: string[];
  knownLimitations?: string[];
}

export interface Project {
  id: string;
  number: string;
  name: string;
  title: string;
  category:
    | "FLAGSHIP BACKEND"
    | "DISTRIBUTED SYSTEMS"
    | "FULL-STACK BACKEND"
    | "REAL-TIME FULL-STACK"
    | "FULL-STACK APPLICATION"
    | "AI INTEGRATION";
  group: "primary" | "fullstack" | "additional";
  isFlagship?: boolean;
  tagline: string;
  problemStatement: string;
  whyBuilt: string;
  stack: ProjectTechStack;
  implementationHighlights: string[];
  verifiedCapabilities: string[];
  engineeringNotes: EngineeringNotes;
  architectureDiagram: ArchitectureDiagram;
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "hookforge",
    number: "01",
    name: "HookForge",
    title: "Distributed Webhook Delivery Infrastructure",
    category: "FLAGSHIP BACKEND",
    group: "primary",
    isFlagship: true,
    tagline:
      "A multi-tenant webhook delivery platform built with Java and Spring Boot, focusing on reliable event routing, asynchronous processing, delivery tracking, and failure recovery.",
    problemStatement:
      "Third-party integrations routinely drop payloads during network blips, destination rate limits, or slow consumer timeouts. HookForge isolates tenant traffic and guarantees at-least-once delivery without cross-service transactions.",
    whyBuilt:
      "Built to explore distributed reliability patterns in Java 21, specifically solving the Dual-Write problem across relational databases and message brokers while ensuring multi-tenant delivery security.",
    stack: {
      languageAndFramework: ["Java 21 (LTS)", "Spring Boot 3", "Spring Data JPA"],
      databaseAndMessaging: ["PostgreSQL", "Apache Kafka", "Redis"],
      infrastructureAndTesting: ["Docker", "Docker Compose", "JUnit 5", "Mockito"],
      all: [
        "Java 21",
        "Spring Boot",
        "PostgreSQL",
        "Apache Kafka",
        "Redis",
        "Docker",
        "JUnit",
        "Mockito",
      ],
    },
    implementationHighlights: [
      "Transactional Outbox pattern for atomic event persistence and safe publishing",
      "Kafka-partitioned event pipeline decoupling ingress from delivery workers",
      "Concurrent delivery claiming using PostgreSQL row locks to prevent duplicate dispatches",
      "HMAC-SHA256 payload signing for cryptographic integrity and verification",
    ],
    verifiedCapabilities: [
      "Transactional Outbox pattern: Ingress transactions write business events directly into an outbox table within local ACID boundaries.",
      "Asynchronous Kafka Publisher: Poller background workers stream outbox records to partitioned Kafka topics without 2-phase commits.",
      "Concurrent Delivery Worker Pools: Workers claim pending dispatches using PostgreSQL row-level locks ('FOR UPDATE SKIP LOCKED') avoiding worker contention.",
      "Delivery Lifecycle Tracking: Comprehensive state machine tracking PENDING, IN_FLIGHT, DELIVERED, and FAILED states.",
      "HMAC-SHA256 Payload Signing: Calculates SHA-256 signatures with tenant endpoint secret keys in request headers for payload verification.",
      "Exponential Backoff Retries: Automated retry scheduling with jitter to prevent thundering herd problems on struggling consumer endpoints.",
      "Tenant Isolation: Endpoint configurations, tenant-specific rate bounds, and delivery audit logs are partitioned by tenant identity.",
      "Redis Idempotency Check: Caches unique delivery keys to eliminate redundant dispatches on transient network retries.",
    ],
    engineeringNotes: {
      title: "Architecture & Engineering Decisions",
      description:
        "Engineered around resilient asynchronous delivery principles. Avoids distributed 2-phase commits (2PC) across relational databases and Kafka by relying on the Transactional Outbox pattern.",
      architecturalPatterns: [
        "Transactional Outbox Pattern: Atomic dual-write elimination; writes outbox messages inside the same database transaction as business logic.",
        "Competing Consumers Pattern: Kafka consumer groups scale delivery workers horizontally across topic partitions.",
        "Pessimistic Row Claiming: Delivery dispatcher uses row-level locking with SKIP LOCKED semantics to prevent race conditions among multiple workers.",
      ],
      dataFlow: [
        "1. Ingress API accepts payload, validates tenant credentials, and inserts an Outbox event inside a single PostgreSQL transaction.",
        "2. Outbox Relay poller streams committed events into designated Kafka topics.",
        "3. Delivery workers consume Kafka events, compute HMAC-SHA256 signatures, and claim dispatch tasks via PostgreSQL lock.",
        "4. HTTP client attempts webhook delivery to destination URL with configurable timeouts.",
        "5. Result status (HTTP 2xx, 4xx, 5xx) updates lifecycle table; failures schedule exponential backoff retries.",
      ],
      concurrencyAndConsistency: [
        "Avoids duplicate dispatches under high concurrency by utilizing PostgreSQL 'FOR UPDATE SKIP LOCKED'.",
        "Workers process distinct records without thread blocking or deadlock vulnerabilities.",
        "Redis distributed keys track in-flight idempotency tokens for rapid deduplication.",
      ],
      securityImplementation: [
        "Tenant-scoped API key authorization enforced on all ingress endpoints.",
        "Outgoing webhooks signed with HMAC-SHA256; destination endpoints verify X-HookForge-Signature header with their shared secret.",
      ],
      failureHandling: [
        "Transient network timeouts and HTTP 5xx responses trigger exponential backoff with randomized jitter.",
        "Exhausted retries transition to FAILED status for operator inspection and replay.",
      ],
      designTradeoffs: [
        "Outbox polling introduces slight latency (sub-100ms) compared to direct network dispatches, but guarantees message durability even across server crashes.",
        "Chose PostgreSQL row locks for claiming over Redis queues to maintain single-source-of-truth ACID consistency with delivery history.",
      ],
      knownLimitations: [
        "Requires active database polling loop; at extreme scale, change-data-capture (Debezium) would replace scheduled polling.",
      ],
    },
    architectureDiagram: {
      type: "event-driven",
      description:
        "Outbox-backed asynchronous delivery pipeline connecting PostgreSQL persistence with Kafka distribution",
      nodes: [
        { id: "client", label: "Tenant Application", sublabel: "Event Ingress", type: "client" },
        { id: "api", label: "Spring Boot Ingress", sublabel: "REST API & Auth", type: "service" },
        { id: "pg", label: "PostgreSQL Database", sublabel: "Outbox & Delivery States", type: "database" },
        { id: "relay", label: "Outbox Relay Service", sublabel: "Kafka Producer Poller", type: "service" },
        { id: "kafka", label: "Apache Kafka", sublabel: "Partitioned Topics", type: "queue" },
        { id: "worker", label: "Delivery Workers", sublabel: "HMAC Signing & Row Lock", type: "service" },
        { id: "redis", label: "Redis Cache", sublabel: "Idempotency & Deduplication", type: "database" },
        { id: "endpoint", label: "Destination Server", sublabel: "Customer Webhook Target", type: "external" },
      ],
      connections: [
        { from: "client", to: "api", label: "POST /events", protocol: "HTTPS" },
        { from: "api", to: "pg", label: "Write Outbox Table", protocol: "ACID TX" },
        { from: "pg", to: "relay", label: "Poll Unsent", protocol: "SQL" },
        { from: "relay", to: "kafka", label: "Publish Events", protocol: "Kafka Protocol" },
        { from: "kafka", to: "worker", label: "Consume Message", protocol: "Consumer Group" },
        { from: "worker", to: "pg", label: "FOR UPDATE SKIP LOCKED", protocol: "Row Lock" },
        { from: "worker", to: "redis", label: "Check Idempotency", protocol: "TCP" },
        { from: "worker", to: "endpoint", label: "Signed POST (HMAC-SHA256)", protocol: "HTTPS" },
      ],
      flowSteps: [
        "Tenant pushes webhook event via REST API",
        "Ingress stores payload in Outbox table within local PostgreSQL transaction",
        "Relay worker publishes committed events to Apache Kafka partitioned topic",
        "Delivery worker claims task using 'FOR UPDATE SKIP LOCKED' and checks Redis idempotency",
        "Worker executes signed HMAC-SHA256 HTTP dispatch to destination server with backoff",
      ],
    },
    githubUrl: "https://github.com/nisatsama/HookForge",
  },
  {
    id: "shelfsense",
    number: "02",
    name: "ShelfSense",
    title: "Event-Driven Retail Inventory Intelligence & Replenishment Platform",
    category: "DISTRIBUTED SYSTEMS",
    group: "primary",
    tagline:
      "An event-driven retail inventory platform designed to support inventory visibility, stockout intelligence, and replenishment decision-making.",
    problemStatement:
      "Retail supply chains suffer from inventory phantom reads and overselling when concurrent checkouts hit warehouse ledgers without deterministic row locking and real-time event propagation.",
    whyBuilt:
      "Designed to model retail multi-channel inventory synchronization with strict ACID database constraints, Redis catalog caching, and Kafka event streaming across fulfillment centers.",
    stack: {
      languageAndFramework: ["Java 21 (LTS)", "Spring Boot 3", "Spring Data JPA"],
      databaseAndMessaging: ["PostgreSQL", "Apache Kafka", "Redis"],
      infrastructureAndTesting: ["Docker", "AWS (EC2/RDS setup)", "JUnit 5"],
      all: [
        "Java 21",
        "Spring Boot",
        "PostgreSQL",
        "Apache Kafka",
        "Redis",
        "Docker",
        "AWS",
      ],
    },
    implementationHighlights: [
      "SKU-level inventory tracking across distributed warehouse and store nodes",
      "Transactional reservation workflows with strict database constraints",
      "PostgreSQL row-level locking preventing overselling during traffic surges",
      "Kafka-based event streams for order placement, cancellations, and restocks",
    ],
    verifiedCapabilities: [
      "SKU-Level Stock Visibility: Real-time inventory tracking partitioned by SKU, warehouse ID, and location.",
      "Transactional Reservation Workflows: Atomically reserves stock during checkout with dedicated expiry windows.",
      "Database Constraint Enforcement: Strict PostgreSQL CHECK constraints (e.g. quantity >= 0) to categorically prevent negative stock.",
      "Event-Driven Order Stream: Emits and listens for Kafka topics (OrderPlaced, OrderCancelled, InventoryReplenished).",
      "High-Speed Read Caching: Hot SKU inventory snapshots cached in Redis to offload repetitive catalog query load.",
      "Replenishment Baseline Rules: Computes reorder recommendation thresholds considering supplier lead times and safety stock minimums.",
      "Modular Backend Architecture: Clean domain separation for inventory ledgers, order handlers, and replenishment queues.",
    ],
    engineeringNotes: {
      title: "Architecture & Engineering Decisions",
      description:
        "Engineered to solve concurrency bottlenecks in high-volume inventory updates. Prioritizes data consistency over eventual consistency for stock reservation.",
      architecturalPatterns: [
        "Event-Driven Architecture: Asynchronous Kafka pub-sub decouples order placement services from warehouse stock decrements.",
        "Cache-Aside Pattern: Redis caches frequent SKU availability lookups with programmatic cache invalidation on ledger write.",
        "Optimistic / Pessimistic Concurrency: Row-level locking during high-contention checkout reservation transactions.",
      ],
      dataFlow: [
        "1. Client or store submits purchase/reservation request with SKU and quantity.",
        "2. Service verifies active stock in Redis cache, then opens transactional DB session.",
        "3. PostgreSQL acquires row lock on SKU record, verifies constraint (available_stock >= requested), and records reservation.",
        "4. On successful commit, OrderPlaced event is pushed to Kafka topic.",
        "5. Warehouse fulfillment and replenishment services ingest Kafka stream to update logistics state.",
      ],
      concurrencyAndConsistency: [
        "PostgreSQL row-level locking during reservation transactions prevents phantom allocations.",
        "CHECK constraints at table level guarantee inventory counts can never drop below zero even under simultaneous concurrent queries.",
      ],
      securityImplementation: [
        "Spring Security role verification ensuring store personnel and automated services only access authorized warehouse boundaries.",
      ],
      failureHandling: [
        "Order cancellation Kafka events automatically release reserved stock back into the available pool.",
        "Failed database transactions roll back reservation tokens completely without partial updates.",
      ],
      designTradeoffs: [
        "Direct row locks limit maximum writes per single SKU to database transaction speed, but ensure 100% guarantee against overselling.",
      ],
      knownLimitations: [
        "Inventory replication across geographically dispersed regional warehouses relies on centralized PostgreSQL ledger synchronization.",
      ],
    },
    architectureDiagram: {
      type: "distributed",
      description:
        "Event-driven inventory synchronization system combining PostgreSQL transactional consistency with Kafka streaming",
      nodes: [
        { id: "store", label: "Retail / Storefront Client", sublabel: "Order Ingress", type: "client" },
        { id: "inv_service", label: "Inventory Service", sublabel: "Spring Boot 3", type: "service" },
        { id: "redis", label: "Redis Cache", sublabel: "Catalog Read Tier", type: "database" },
        { id: "postgres", label: "PostgreSQL Ledger", sublabel: "ACID Constraints & Row Locks", type: "database" },
        { id: "kafka", label: "Apache Kafka", sublabel: "Inventory Event Bus", type: "queue" },
        { id: "replenish", label: "Replenishment Engine", sublabel: "Safety Stock & Reorders", type: "service" },
      ],
      connections: [
        { from: "store", to: "inv_service", label: "Reserve SKU Stock", protocol: "REST / HTTPS" },
        { from: "inv_service", to: "redis", label: "Check Stock Cache", protocol: "TCP" },
        { from: "inv_service", to: "postgres", label: "Row Lock & Check Constraints", protocol: "ACID Transaction" },
        { from: "inv_service", to: "kafka", label: "Emit Order / Stock Event", protocol: "Kafka Protocol" },
        { from: "kafka", to: "replenish", label: "Ingest Consumption Stream", protocol: "Consumer" },
        { from: "replenish", to: "postgres", label: "Trigger Restock Entry", protocol: "SQL" },
      ],
      flowSteps: [
        "Storefront submits checkout reservation for target SKU",
        "Inventory service performs fast read against Redis cache",
        "PostgreSQL locks SKU row, verifies stock constraints, and executes atomic deduction",
        "Kafka publishes OrderPlaced event for warehouse and replenishment subscribers",
        "Replenishment engine checks threshold and suggests supplier reorders when stock breaches safety limits",
      ],
    },
    githubUrl: "https://github.com/nisatsama/ShelfSense",
  },
  {
    id: "supportflow",
    number: "03",
    name: "SupportFlow SLA",
    title: "Helpdesk Ticket Management & SLA Management Platform",
    category: "FULL-STACK BACKEND",
    group: "primary",
    tagline:
      "A full-stack helpdesk platform built with Spring Boot and React, supporting role-based ticket workflows, authentication, and customer-support communication.",
    problemStatement:
      "Customer support operations require rigorous role boundaries, authenticated communication channels, and centralized ticket state management to prevent lost requests and disorganized customer communications.",
    whyBuilt:
      "Built to demonstrate production-grade Spring Security JWT integration with clean React state management, relational ticket tracking, and role-based access control.",
    stack: {
      languageAndFramework: ["Java", "Spring Boot", "Spring Security", "React.js"],
      databaseAndMessaging: ["PostgreSQL", "Spring Data JPA", "Hibernate"],
      infrastructureAndTesting: ["REST APIs", "Tailwind CSS", "JWT (JSON Web Tokens)"],
      all: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "React",
        "PostgreSQL",
        "JWT",
        "Tailwind CSS",
        "REST APIs",
      ],
    },
    implementationHighlights: [
      "USER and ADMIN role-based access control (RBAC)",
      "Stateless JWT authentication integrated with Spring Security filter chain",
      "Structured ticket lifecycle management (Create, Prioritize, Resolve, Close)",
      "Data isolation restricting regular users to their own ticket threads",
    ],
    verifiedCapabilities: [
      "Role-Based Authorization (RBAC): Strict separation of USER and ADMIN permissions enforced via Spring Security annotations.",
      "Stateless JWT Authentication: Secure login flow producing signed bearer tokens validated per HTTP request.",
      "Ticket Lifecycle Management: Structured status progression (Open, Pending, Resolved, Closed) and priority indexing.",
      "User Ticket Isolation: Endpoints verify request principal so non-admin users only access tickets they authored.",
      "Admin Oversight Workflows: Administrators can view all system tickets, adjust priorities, and reassign statuses.",
      "Conversation Message Threads: Back-and-forth communication history linked directly to ticket entity IDs.",
      "Relational Data Integrity: PostgreSQL foreign keys linking users, tickets, and conversation records.",
    ],
    engineeringNotes: {
      title: "Architecture & Engineering Decisions",
      description:
        "Focuses on stateless API security and role-based data partitioning. Enforces role verification at both the HTTP security filter layer and method security level.",
      architecturalPatterns: [
        "Stateless Client-Server: React client communicates via REST APIs with Authorization Bearer headers.",
        "Filter Chain Interception: Custom OncePerRequestFilter validates JWT signatures and sets authentication in SecurityContext.",
        "Layered Architecture: Clear separation across Controllers, Services, Repositories, and Entity models.",
      ],
      dataFlow: [
        "1. User/Admin logs in with credentials; Spring Security authenticates against PostgreSQL users table and returns signed JWT.",
        "2. React frontend stores token securely and attaches it to subsequent Axios/fetch request headers.",
        "3. OncePerRequestFilter validates token signature, expiration, and extracts user role authorities.",
        "4. Controller routes request to TicketService; service enforces user ownership rules before database query.",
        "5. Paginated ticket responses or updated ticket states are returned to React frontend.",
      ],
      concurrencyAndConsistency: [
        "Database transactions with Hibernate @Transactional boundaries ensure atomic status and comment updates.",
        "Stateless design ensures multiple server instances can validate tokens without shared session replication.",
      ],
      securityImplementation: [
        "BCrypt password hashing for user credential storage in PostgreSQL.",
        "Method-level authorization using @PreAuthorize ensures admin-only mutations cannot be called by standard users.",
        "CORS and CSRF policies configured according to stateless API standards.",
      ],
      failureHandling: [
        "Global ControllerAdvice captures authentication exceptions, resource-not-found, and validation errors returning standardized error responses.",
      ],
      designTradeoffs: [
        "Stateless JWTs prevent immediate revocation before expiration without token blacklisting, which was accepted in favor of zero server session memory overhead.",
      ],
      knownLimitations: [
        "Focuses on core ticket workflow and RBAC; automated SLA timer background daemon is not active in current repository version.",
      ],
    },
    architectureDiagram: {
      type: "client-server",
      description:
        "Full-stack architecture pairing React client with Spring Security JWT filter and PostgreSQL persistence",
      nodes: [
        { id: "react", label: "React Frontend", sublabel: "UI & JWT Storage", type: "client" },
        { id: "filter", label: "JWT Auth Filter", sublabel: "Spring Security Chain", type: "service" },
        { id: "controller", label: "Ticket Controller", sublabel: "REST API Endpoints", type: "service" },
        { id: "service", label: "Ticket & User Service", sublabel: "RBAC Logic (User/Admin)", type: "service" },
        { id: "postgres", label: "PostgreSQL Database", sublabel: "Users, Tickets & Threads", type: "database" },
      ],
      connections: [
        { from: "react", to: "filter", label: "Bearer Token Requests", protocol: "HTTPS / REST" },
        { from: "filter", to: "controller", label: "Populated SecurityContext", protocol: "Internal" },
        { from: "controller", to: "service", label: "Execute Workflow", protocol: "Method Call" },
        { from: "service", to: "postgres", label: "Spring Data JPA / SQL", protocol: "JDBC / TCP" },
      ],
      flowSteps: [
        "React client sends authenticated REST request with JWT Bearer token",
        "Spring Security OncePerRequestFilter validates token signature and injects User/Admin authorities",
        "Controller delegates request to service layer enforcing role-based ticket visibility",
        "Spring Data JPA reads/updates ticket entities and conversation threads in PostgreSQL",
      ],
    },
    githubUrl:
      "https://github.com/nisatsama/SupportFlow-SLA-Driven-Customer-Support-Platform",
  },
  {
    id: "codecollab",
    number: "04",
    name: "CodeCollab",
    title: "Real-Time Collaborative Coding Platform",
    category: "REAL-TIME FULL-STACK",
    group: "fullstack",
    tagline:
      "A real-time collaborative coding platform featuring shared editor sessions, WebSocket communication, group chat, and containerized multi-language code execution.",
    problemStatement:
      "Remote programming interviews and peer reviews struggle with synchronization latency, race conditions in shared editor buffers, and the security hazards of running untrusted participant code directly on host servers.",
    whyBuilt:
      "Engineered to master full-duplex WebSocket protocols with Socket.IO, Monaco Editor buffer reconciliation, and ephemeral container sandboxing for safe code execution.",
    stack: {
      languageAndFramework: ["React.js", "Node.js", "Express.js", "Socket.IO"],
      databaseAndMessaging: ["WebSockets", "In-Memory Session Store"],
      infrastructureAndTesting: ["Docker (CLI Container Sandboxing)", "Monaco Editor", "Tailwind CSS"],
      all: [
        "React.js",
        "Node.js",
        "Express.js",
        "Socket.IO",
        "WebSockets",
        "Docker",
        "Monaco Editor",
        "Tailwind CSS",
      ],
    },
    implementationHighlights: [
      "Real-time dual-way code synchronization using Socket.IO room broadcasts",
      "VS Code-grade code editing experience powered by integrated Monaco Editor",
      "Unique room code generation and instant joining workflow",
      "Isolated multi-language execution sandbox using lightweight Docker containers",
    ],
    verifiedCapabilities: [
      "Real-Time Editor Synchronization: Keystrokes broadcast to peers in the same room using Socket.IO event channels.",
      "Monaco Editor Integration: Professional IDE editor experience with syntax highlighting and indentation.",
      "Room-Based Collaboration: Isolated room codes allowing multiple developer groups to collaborate simultaneously.",
      "In-Memory Session State: Server retains current buffer state per active room so newly joining participants sync instantly.",
      "Integrated Real-Time Group Chat: Chat channel allows participants to discuss code changes without leaving the window.",
      "Docker Execution Sandbox: User code is executed inside ephemeral Docker containers supporting Java, Python, JavaScript, and C++.",
      "Execution Output Terminal: Displays stdout, stderr, and run duration back to all room participants.",
    ],
    engineeringNotes: {
      title: "Architecture & Engineering Decisions",
      description:
        "Balances low-latency keystroke broadcasting with strict security boundaries for executing arbitrary code.",
      architecturalPatterns: [
        "Publish-Subscribe over WebSockets: Socket.IO rooms act as event channels for buffer updates and chat.",
        "Ephemeral Container Sandboxing: Code execution spawns isolated disposable containers with memory/CPU caps.",
        "In-Memory State Cache: Room buffer maintained on server to provide instant snapshot to new joiners.",
      ],
      dataFlow: [
        "1. Participant connects to room via unique room identifier over WebSocket handshake.",
        "2. Server responds with current buffer text and language mode from in-memory room map.",
        "3. Local Monaco Editor change events emit debounced 'code-change' packets to the server.",
        "4. Server broadcasts change to other sockets joined to that room namespace.",
        "5. When 'Run' is triggered, backend writes code file and invokes isolated Docker run command with strict timeouts.",
        "6. stdout/stderr stream returns to client terminal window.",
      ],
      concurrencyAndConsistency: [
        "Socket.IO room broadcasting delivers updates with single-digit millisecond latency.",
        "Debounced emissions avoid flooding socket connections during rapid typing.",
      ],
      securityImplementation: [
        "Code execution is strictly isolated inside non-privileged Docker containers without host network access.",
        "Execution processes are bounded by memory constraints and execution time limits (e.g. 5 seconds) to prevent infinite loops.",
      ],
      failureHandling: [
        "Socket disconnects notify room members; automatic reconnection attempts re-establish session buffer.",
        "Container timeouts terminate runaway processes cleanly without crashing the Node.js server.",
      ],
      designTradeoffs: [
        "In-memory session state enables maximum speed and simplicity, though rooms reset when the Node.js process restarts.",
      ],
      knownLimitations: [
        "Designed for single-node deployment; horizontal multi-server scaling would require Redis Socket.IO adapter.",
      ],
    },
    architectureDiagram: {
      type: "client-server",
      description:
        "Full-duplex WebSocket architecture coordinating Monaco Editor rooms with Dockerized execution sandboxes",
      nodes: [
        { id: "editor1", label: "Developer Client A", sublabel: "Monaco Editor & Chat", type: "client" },
        { id: "editor2", label: "Developer Client B", sublabel: "Monaco Editor & Chat", type: "client" },
        { id: "server", label: "Node.js / Express Server", sublabel: "Socket.IO Room Coordinator", type: "service" },
        { id: "memory", label: "In-Memory Room Store", sublabel: "Active Document Buffers", type: "database" },
        { id: "sandbox", label: "Docker Execution Sandbox", sublabel: "Isolated Container (Java/Python/C++)", type: "sandbox" },
      ],
      connections: [
        { from: "editor1", to: "server", label: "Keystrokes / Chat", protocol: "WebSocket (Socket.IO)" },
        { from: "editor2", to: "server", label: "Keystrokes / Chat", protocol: "WebSocket (Socket.IO)" },
        { from: "server", to: "memory", label: "Sync Buffer", protocol: "Internal RAM" },
        { from: "server", to: "sandbox", label: "docker run --rm -m 256M", protocol: "CLI Spawn" },
        { from: "sandbox", to: "server", label: "stdout / stderr", protocol: "Process Pipe" },
      ],
      flowSteps: [
        "Clients establish persistent WebSocket connections into a shared room ID",
        "Keystrokes in Monaco Editor are synchronized in real time to all room participants",
        "Server caches the current code buffer in memory for seamless participant onboarding",
        "User triggers code execution; server spawns a CPU-capped, network-disabled Docker container",
        "Execution output streams back to the client terminal console",
      ],
    },
    githubUrl: "https://github.com/nisatsama/CodeCollab",
  },
  {
    id: "travelogia",
    number: "05",
    name: "Travelogia",
    title: "Full-Stack Travel Booking Platform",
    category: "FULL-STACK APPLICATION",
    group: "fullstack",
    tagline:
      "A full-stack travel discovery and booking application with authentication, destination exploration, personalized favorites, and booking management.",
    problemStatement:
      "Travel discovery portals frequently suffer from disconnected booking states, lack of personalized wishlist curation, and unorganized itinerary navigation for travelers planning complex trips.",
    whyBuilt:
      "Developed to build a complete end-to-end full-stack MERN product showcasing document database modeling, JWT session security, and responsive travel catalogue navigation.",
    stack: {
      languageAndFramework: ["React.js", "Node.js", "Express.js"],
      databaseAndMessaging: ["MongoDB", "Mongoose ODM"],
      infrastructureAndTesting: ["JWT", "bcrypt.js", "Tailwind CSS"],
      all: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "JWT",
        "bcrypt.js",
        "Tailwind CSS",
      ],
    },
    implementationHighlights: [
      "User authentication with salted bcrypt password hashing and JWT session tokens",
      "Protected routes in React preventing unauthorized access to booking dashboards",
      "Destination catalog with keyword search, price filtering, and category selection",
      "Booking management system tracking historical and confirmed traveler reservations",
    ],
    verifiedCapabilities: [
      "Secure User Authentication: Salted password hashing via bcrypt.js and stateless JWT authorization.",
      "Client-Side Route Protection: React router authentication guards protecting private dashboard routes.",
      "Destination Catalog Engine: Search filtering by keyword, price range, and destination categories.",
      "Interactive Booking System: Booking reservation forms with input validation and instant state updates.",
      "Personalized Favorites Drawer: Authenticated users can bookmark upcoming destinations to their profile.",
      "User Booking History: Structured dashboard displaying confirmed travel itineraries and reservation details.",
      "Document Schema Relationships: Mongoose schemas linking users, destinations, and booking records.",
    ],
    engineeringNotes: {
      title: "Architecture & Engineering Decisions",
      description:
        "Structured around clean RESTful principles and MongoDB document collections. Separates concerns across routes, controllers, and Mongoose models.",
      architecturalPatterns: [
        "MERN Architecture: Decoupled React frontend communicating with Node.js Express backend.",
        "Document Data Modeling: Embeds itinerary details while referencing user and booking documents.",
        "Middleware Security Pipeline: Express middleware intercepts protected routes for token verification.",
      ],
      dataFlow: [
        "1. Traveler registers or logs in; backend validates bcrypt hash and issues JWT.",
        "2. React client stores token and fetches destination collection from MongoDB.",
        "3. Traveler searches/filters destinations and submits a booking reservation request.",
        "4. Auth middleware verifies JWT and attaches user ID to request body.",
        "5. BookingController validates dates, creates booking document, and appends reference to user profile.",
      ],
      concurrencyAndConsistency: [
        "Mongoose schema validation ensures required fields and valid date ranges are enforced before write.",
      ],
      securityImplementation: [
        "Bcrypt.js with salt rounds prevents credential exposure in database dumps.",
        "Token verification middleware ensures travelers cannot modify or inspect other users' bookings.",
      ],
      failureHandling: [
        "Standardized error responses handle duplicate emails, invalid credentials, and missing destination records.",
      ],
      designTradeoffs: [
        "MongoDB provides rapid schema evolution for rich destination packages, while relational constraints were traded off for document nesting.",
      ],
      knownLimitations: [
        "Payment gateway processing is currently modeled as mock transaction workflow.",
      ],
    },
    architectureDiagram: {
      type: "client-server",
      description:
        "Full-stack MERN architecture connecting React single-page app with Express API and MongoDB Atlas",
      nodes: [
        { id: "react", label: "React Frontend", sublabel: "Tailwind UI & Auth State", type: "client" },
        { id: "express", label: "Express.js REST API", sublabel: "Controllers & Routers", type: "service" },
        { id: "auth", label: "JWT Auth Middleware", sublabel: "Bcrypt & Token Verification", type: "service" },
        { id: "mongo", label: "MongoDB Database", sublabel: "Users, Destinations & Bookings", type: "database" },
      ],
      connections: [
        { from: "react", to: "express", label: "REST Queries & Actions", protocol: "HTTPS / JSON" },
        { from: "express", to: "auth", label: "Verify Principal", protocol: "Middleware" },
        { from: "auth", to: "mongo", label: "Mongoose ODM Queries", protocol: "MongoDB Wire" },
      ],
      flowSteps: [
        "User authenticates; server returns signed JWT token",
        "React SPA renders destination catalogue with search and filter state",
        "User creates booking; request passes through JWT authorization middleware",
        "Express controller saves reservation record into MongoDB with user references",
      ],
    },
    githubUrl: "https://github.com/nisatsama/Travelogia",
  },
  {
    id: "airesumeanalyser",
    number: "06",
    name: "AI Resume Analyzer",
    title: "AI-Powered Resume Analysis & ATS Feedback System",
    category: "AI INTEGRATION",
    group: "additional",
    tagline:
      "An AI-powered resume analysis application that extracts resume information and generates feedback on skills, strengths, weaknesses, and ATS-oriented improvements.",
    problemStatement:
      "Candidates applying for software engineering roles struggle to determine whether their resume content will parse correctly through Applicant Tracking Systems (ATS) or showcase relevant engineering keywords.",
    whyBuilt:
      "Created to explore generative AI model prompt engineering, server-side PDF document parsing, and structured feedback extraction using Google's Gemini models.",
    stack: {
      languageAndFramework: ["React.js", "Node.js", "Express.js"],
      databaseAndMessaging: ["MongoDB", "Mongoose"],
      infrastructureAndTesting: ["Gemini API", "PDF Processing (pdf-parse)", "JWT", "Tailwind CSS"],
      all: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Gemini API",
        "PDF Processing",
        "JWT",
      ],
    },
    implementationHighlights: [
      "Resume PDF file upload with server-side text extraction",
      "Automated technical skill extraction matching candidate competencies",
      "Gemini-powered evaluation highlighting key strengths and improvements",
      "ATS formatting and keyword recommendations",
    ],
    verifiedCapabilities: [
      "PDF Ingestion & Text Extraction: Ingests uploaded resume documents and extracts clean plain-text streams.",
      "Skill Identification: Analyzes extracted text to parse programming languages, frameworks, and database capabilities.",
      "Gemini Intelligence Engine: Prompts Gemini API with structured evaluation rubrics (readability, quantification, ATS friendliness).",
      "Strengths & Weaknesses Breakdown: Generates actionable suggestions for improving impact verbs, bullet points, and project presentation.",
      "Authenticated History Dashboard: Users can inspect past uploaded resumes and track evaluation feedback across revisions.",
      "MongoDB Result Caching: Stores generated analysis outputs in MongoDB to avoid redundant API token costs on revisit.",
    ],
    engineeringNotes: {
      title: "Architecture & Engineering Decisions",
      description:
        "Combines document processing pipelines with LLM evaluation schemas. Restricts model output to structured JSON formats for deterministic UI rendering.",
      architecturalPatterns: [
        "Pipeline Pattern: Ingestion -> Text Parsing -> Gemini Analysis -> Structured Response Rendering.",
        "Prompt Engineering: System instructions enforce strict grading rubrics and prevent hallucinated ratings.",
        "Document Result Storage: Analysis outcomes cached in MongoDB for instant user revisits.",
      ],
      dataFlow: [
        "1. Candidate uploads PDF resume via React file picker.",
        "2. Express server receives multipart form data and passes buffer to PDF text parser.",
        "3. Parsed text is structured into a contextual prompt with ATS scoring criteria.",
        "4. Server calls Gemini API to evaluate skill density, metric presence, and formatting.",
        "5. Response is stored in MongoDB and returned as structured JSON to the dashboard.",
      ],
      concurrencyAndConsistency: [
        "Multer memory storage limits upload file sizes to 5MB to protect server memory.",
      ],
      securityImplementation: [
        "JWT authentication isolates user resume history to authenticated accounts.",
        "Uploaded files processed in-memory without storing unparsed raw PDFs on unencrypted host disks.",
      ],
      failureHandling: [
        "Corrupted or scanned image PDFs without extractable text streams return clean user warnings instructing text-based uploads.",
      ],
      designTradeoffs: [
        "Requires text-based PDFs rather than OCR image scanning to ensure fast processing and low operational overhead.",
      ],
      knownLimitations: [
        "Evaluation quality depends on LLM response latency; cached results eliminate repeated wait times.",
      ],
    },
    architectureDiagram: {
      type: "pipeline",
      description:
        "Document ingestion and LLM evaluation pipeline parsing PDF resumes and generating structured ATS reviews",
      nodes: [
        { id: "react", label: "React Frontend", sublabel: "PDF Upload & Dashboard", type: "client" },
        { id: "express", label: "Express API", sublabel: "Multer Upload Handler", type: "service" },
        { id: "parser", label: "PDF Parse Engine", sublabel: "Text & Token Extraction", type: "service" },
        { id: "gemini", label: "Gemini API Engine", sublabel: "Structured Prompt Evaluation", type: "external" },
        { id: "mongo", label: "MongoDB Database", sublabel: "Analysis Cache & Users", type: "database" },
      ],
      connections: [
        { from: "react", to: "express", label: "Upload PDF", protocol: "Multipart / Form" },
        { from: "express", to: "parser", label: "Raw Buffer", protocol: "In-Memory Stream" },
        { from: "parser", to: "gemini", label: "Contextual Text Prompt", protocol: "HTTPS / REST" },
        { from: "gemini", to: "express", label: "Structured JSON Review", protocol: "JSON" },
        { from: "express", to: "mongo", label: "Cache Analysis Result", protocol: "Mongoose Wire" },
      ],
      flowSteps: [
        "User uploads PDF resume document through the web dashboard",
        "Server extracts clean plain text from document buffer using PDF parse pipeline",
        "Backend constructs structured prompt with rubrics and queries Gemini API",
        "Gemini generates actionable ATS improvements, skill extractions, and feedback",
        "Result is stored in MongoDB and rendered on the analysis dashboard",
      ],
    },
    githubUrl: "https://github.com/nisatsama/AIResumeAnalyser",
    liveUrl: "https://ai-resume-analyser-brown.vercel.app/",
  },
];
