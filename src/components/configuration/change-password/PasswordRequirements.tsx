export default function PasswordRequirements() {
  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        비밀번호 요구사항:
      </h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• 8자 이상</li>
        <li>• 영문, 숫자, 특수문자 조합 권장</li>
        <li>• 이전 비밀번호와 다른 비밀번호</li>
      </ul>
    </div>
  );
}
