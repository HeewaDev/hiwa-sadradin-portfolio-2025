import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ProjectSchemaProps {
  projectName: string;
  projectUrl: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  datePublished?: string;
  role?: string;
  company?: string;
}

const ProjectSchema: React.FC<ProjectSchemaProps> = ({
  projectName,
  projectUrl,
  description,
  technologies,
  imageUrl = '',
  datePublished = new Date().toISOString().split('T')[0],
  role = 'Lead Developer',
  company = 'Xcreative'
}) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {`
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "${projectName}",
  "description": "${description}",
  "codeRepository": "${projectUrl}",
  "programmingLanguage": ${JSON.stringify(technologies)},
  "author": {
    "@type": "Person",
    "@id": "https://yourportfolio.com/#person",
    "name": "Hiwa Sadraldin",
    "alternateName": ["Hiwa Sadraden", "Hiwa Sadradin", "Hiwa Sadradeen"]
  },
  "datePublished": "${datePublished}",
  "image": "${imageUrl || 'https://yourportfolio.com/projects/' + projectName.toLowerCase().replace(/\s+/g, '-') + '.jpg'}",
  "about": {
    "@type": "Thing",
    "name": "${projectName}",
    "description": "${description}"
  },
  "creator": {
    "@type": "Person",
    "@id": "https://yourportfolio.com/#person",
    "name": "Hiwa Sadraldin",
    "jobTitle": "${role}",
    "worksFor": {
      "@type": "Organization",
      "name": "${company}"
    }
  }
}
        `}
      </script>
    </Helmet>
  );
};

export default ProjectSchema;