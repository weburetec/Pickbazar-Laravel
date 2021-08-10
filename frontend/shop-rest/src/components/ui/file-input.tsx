import Uploader from "@components/common/uploader";
import { Controller } from "react-hook-form";

interface FileInputProps {
  control: any;
  name: string;
}

const FileInput = ({ control, name }: FileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { ref, ...rest } }) => <Uploader {...rest} />}
    />
  );
};

export default FileInput;
