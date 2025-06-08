import toast from "react-hot-toast";
import { GoAlertFill } from "react-icons/go";
import { MdNotifications } from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import Box from "../box/Box";
import useStyle from "../globals/useStyle";

const useToast = ({
  variant = "primary",
  id = `${variant}-toast`,
  duration = 2000,
  autoReject = false,
  callbackFn = () => {},
  contents = variant,
  promisedContents = {
    pending: variant,
    fullfilled: variant,
    rejected: variant,
  },
  icon,
  style,
  sx,
  ...props
}) => {
  const { classNameProps, styledProps } = useStyle(
    "toast",
    variant.toLowerCase(),
    false,
    sx,
    style
  );

  const toastProps = {
    id,
    duration,
    className: `${classNameProps} pv1 pl2 pr0 ba bw1 b`,
    style: {
      ...styledProps,
    },
    ...props,
  };

  const ToastContents = () => {
    return <div className="">{contents}</div>;
  };

  const ErrorToastContents = (contents, toastId) => {
    return (
      <>
        <Box
          size={"xs"}
          dir={"row"}
          align={"center"}
          justify={"between"}
          sx={"toast-error-box"}
        >
          <div className="pr2">{contents}</div>
          <div
            className={"toast-error-box-buttonFrame"}
            onClick={() => toast.dismiss(toastId())}
          >
            <RiCloseFill />
          </div>
        </Box>
      </>
    );
  };

  const customToast = {
    primary: () => {
      toast.success(ToastContents, {
        icon: icon || <MdNotifications />,
        ...toastProps,
      });
    },
    success: () => {
      toast.success(ToastContents, {
        icon,
        ...toastProps,
      });
    },
    warning: () => {
      toast.success(ToastContents, {
        icon: icon || <GoAlertFill />,
        ...toastProps,
      });
    },
    error: () => {
      toast.error(ErrorToastContents(contents, customToast.error), {
        icon,
        ...toastProps,
        duration: 60000,
      });
    },
    pending: () => {
      toast.loading(promisedContents.pending, {
        id: `${id}-pending`,
        className: "toast-warning pv1 pl2 pr0 ba bw1 b",
      });
    },
    fullfilled: () => {
      toast.success(promisedContents.fullfilled, {
        id: `${id}-fullfilled`,
        className: "toast-success pv1 pl2 pr0 ba bw1 b",
        duration,
      });
    },
    rejected: () => {
      toast.error(
        ErrorToastContents(promisedContents.rejected, customToast.rejected),
        {
          id: `${id}-fullfilled`,
          className: "toast-error pv1 pl2 pr0 ba bw1 b",
          duration: 120000,
        }
      );
    },
    promised: () => {
      const promise = new Promise((resolve, reject) => {
        customToast.pending();
        setTimeout(() => {
          toast.dismiss(customToast.pending());
          if (autoReject) {
            reject("Promise Rejected");
          } else {
            callbackFn();
            resolve("Promise Resolved");
          }
        }, 1000);
      });
      promise.then(customToast.fullfilled, customToast.rejected);
    },
  };

  return customToast[variant.toLowerCase()];
};
export default useToast;
