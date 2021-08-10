import { UploadIcon } from "@components/icons/upload-icon";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadMutation } from "@graphql/upload.graphql";
import { Attachment } from "@graphql/admin-dashboard-query.graphql";
import { CloseIcon } from "@components/icons/close-icon";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import isObject from "lodash/isObject";

const getPreviewImage = (value: any) => {
  if (Array.isArray(value)) {
    return value.map(({ __typename, ...u }: any) => u);
  }
  if (isObject(value)) {
    const { __typename, ...rest }: any = value;
    return [rest];
  }
  return [];
};
export default function Uploader({ onChange, value, multiple }: any) {
  const { t } = useTranslation();
  const [files, setFiles] = useState<Attachment[]>(getPreviewImage(value));
  const [upload, { loading }] = useUploadMutation();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        const { data } = await upload({
          variables: {
            attachment: acceptedFiles, // it will be an array of uploaded attachments
          },
        });
        let dataAfterRemoveTypename =
          data?.upload?.map(({ __typename, ...u }: any) => u) ?? [];
        if (multiple) {
          dataAfterRemoveTypename = [...files, ...dataAfterRemoveTypename];
        } else {
          dataAfterRemoveTypename = dataAfterRemoveTypename?.[0];
        }
        setFiles(
          Array.isArray(dataAfterRemoveTypename)
            ? dataAfterRemoveTypename
            : [dataAfterRemoveTypename]
        );
        if (onChange) {
          onChange(dataAfterRemoveTypename);
        }
      }
    },
  });

  const handleDelete = (image: string) => {
    // @ts-ignore
    const images = files.filter((file) => file.thumbnail !== image);

    setFiles(images);
    if (onChange) {
      onChange(images);
    }
  };
  const thumbs = files?.map((file: any, idx) => {
    if (file.id) {
      return (
        <div
          className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative"
          key={idx}
        >
          <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
            <img src={file.thumbnail} />
          </div>
          {multiple ? (
            <button
              className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute top-1 end-1 shadow-xl outline-none"
              onClick={() => handleDelete(file.thumbnail)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          ) : null}
        </div>
      );
    }
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
    },
    [files]
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-muted-light" />
        <p className="text-body text-sm mt-4 text-center">
          <span className="text-accent font-semibold">
            {t("text-upload-highlight")}
          </span>{" "}
          {t("text-upload-message")} <br />
          <span className="text-xs text-body">{t("text-img-format")}</span>
        </p>
      </div>

      {(!!thumbs.length || loading) && (
        <aside className="flex flex-wrap mt-2">
          {!!thumbs.length && thumbs}
          {loading && (
            <div className="h-16 flex items-center mt-2 ms-2">
              <Loader simple={true} className="w-6 h-6" />
            </div>
          )}
        </aside>
      )}
    </section>
  );
}
