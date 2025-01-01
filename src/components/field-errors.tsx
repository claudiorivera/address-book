export function FieldErrors({
	fieldErrors,
}: { fieldErrors?: Array<{ errorCode: string; message: string }> }) {
	return (
		<>
			{fieldErrors?.map((error) => (
				<div key={error.errorCode} className="text-red-500">
					{error.message}
				</div>
			))}
		</>
	);
}
