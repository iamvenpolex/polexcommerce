export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center ">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-500 font-semibold">Mipi Tech</span>. All
        rights reserved.
      </p>
    </footer>
  );
}
