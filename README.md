# Fullstack-Authentication-system

“The architecture follows a three-tier model with ALB in public subnets, application servers in private subnets behind an Auto Scaling Group, and RDS in isolated private subnets. Internet access for private instances is enabled via NAT Gateway, while security groups enforce least-privilege access between tiers.”

# Security Groups:
“I designed security groups based on least privilege and layer isolation.
Each tier communicates only with the adjacent tier using security-group-based rules, eliminating public exposure and reducing attack surface.”