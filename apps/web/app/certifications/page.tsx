export default function CertificationsPage() {
  const certs = [
    { name: "AZ-104", provider: "Microsoft Azure", status: "In Progress" },
    { name: "AZ-305", provider: "Microsoft Azure", status: "In Progress" },
    { name: "GCP Professional Cloud Architect", provider: "Google Cloud", status: "Passed" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Certifications</h1>
      <div className="grid gap-4">
        {certs.map((cert) => (
          <div key={cert.name} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">{cert.name}</div>
              <div className="text-sm text-gray-500">{cert.provider}</div>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full ${cert.status === "Passed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {cert.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
