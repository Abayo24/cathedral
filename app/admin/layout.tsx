export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<style>{'body{margin:0}'}</style>
			{children}
		</>
	);
}
