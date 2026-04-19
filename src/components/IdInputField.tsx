type IdInputFieldProps = {
  channelId: string;
  onChange: (id: string) => void;
};

export default function IdInputField({ channelId, onChange }: IdInputFieldProps) {
  return (
    <div>
      <label htmlFor="channel-id"> Channel ID </label>
      <input
        id="channel-id"
        type="text"
        value={channelId}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. 4943361472"
        autoComplete="off"
      />
    </div>
  );
}