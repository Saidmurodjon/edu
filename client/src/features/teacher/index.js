import moment from "moment";
import { useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { toast } from "react-toastify";
import useFetch from "../../hooks/UseFetch";
import IconButton from "../../components/buttons/IconButton";
import Button from "../../components/buttons/Button";

function Transactions() {
  const {
    data: firstData,

    fetchData: fetchFirstData,
  } = useFetch();
  const {
    data: secondData,
    error: secondError,
    fetchData: fetchSecondData,
  } = useFetch();
  useEffect(() => {
    fetchFirstData("teachers");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Delete = async (value) => {
    if (window.confirm("Delete the item?")) {
      fetchSecondData("teachers?_id=" + value._id, {
        method: "delete",
      });
    }
  };
  useEffect(() => {
    if (secondData) {
      toast.success("Teacher ma'lumotlari o'chirildi!", {
        theme: "colored",
      });
      fetchFirstData("teachers");
    } else if (firstData) {
      toast.error(`Error in DELETE request: ${secondError}`, {
        theme: "colored",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondData, secondError]);

  return (
    <>
      <TitleCard
        title="Recent Transactions"
        topMargin="mt-2"
        TopSideButtons={
          <Button
            name={"Add new"}
            btnStyle={"btn-primary px-6 btn-sm normal-case"}
            navigate={"./add-new"}
          />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Pasport</th>
                <th>Age</th>
                <th>Subject</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {firstData
                ? firstData.map((l, k) => {
                    return (
                      <tr key={k}>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-circle w-12 h-12">
                                <img
                                  src={
                                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                  }
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {l.firstName + " " + l.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{l.phone}</td>
                        <td>{l.pasport}</td>

                        <td>{moment(l.age).format("D MMM")}</td>
                        <td>{l.subject}</td>
                        <td>{l.email}</td>
                        <td>
                          <IconButton
                            iconType={"pensil"}
                            value={l}
                            navigate={"./add-new"}
                          />
                          <IconButton
                            iconType={"trash"}
                            value={l}
                            onPress={Delete}
                          />
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Transactions;
