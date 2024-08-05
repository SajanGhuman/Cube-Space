"use client";
import React, { useEffect, useState } from "react";
import { Algorithm } from "@prisma/client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

const Algorithms = () => {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"name" | "notation">("name");

  useEffect(() => {
    const fetchAlgorithms = async () => {
      try {
        const response = await fetch("/api/algs");
        const data = await response.json();
        setAlgorithms(data);
      } catch (error) {
        console.error("Failed to fetch algorithms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithms();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSort = (property: "name" | "notation") => {
    const isAscending = sortBy === property && sortDirection === "asc";
    setSortDirection(isAscending ? "desc" : "asc");
    setSortBy(property);
  };

  // Filter algorithms based on search query
  const filteredAlgorithms = algorithms.filter((algorithm) =>
    algorithm.name.toLowerCase().includes(searchQuery),
  );

  // Sort filtered algorithms based on sort criteria and direction
  const sortedAlgorithms = [...filteredAlgorithms].sort((a, b) => {
    if (sortBy === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === "asc"
        ? a.notation.localeCompare(b.notation)
        : b.notation.localeCompare(a.notation);
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status" className="flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded-full w-[400px] h-[65px] relative top-5 bg-background-green-dark border-[6px] border-text-green px-6 text-left text-white text-[20px]"
        />
      </div>
      <div className="w-screen h-screen flex justify-center items-center">
        <Paper
          sx={{
            width: "800px",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            backgroundColor: "#B8BDB5",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {filteredAlgorithms.length === 0 ? (
            <div className="flex justify-center items-center h-60">
              <p className="text-gray-500 text-xl">No algorithms found</p>
            </div>
          ) : (
            <>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="algorithms table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ minWidth: 170, backgroundColor: "#B8BDB5" }}
                      >
                        Image
                      </TableCell>
                      <TableCell
                        style={{ minWidth: 170, backgroundColor: "#B8BDB5" }}
                      >
                        <TableSortLabel
                          active={sortBy === "name"}
                          direction={sortBy === "name" ? sortDirection : "asc"}
                          onClick={() => handleSort("name")}
                        >
                          Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        style={{ minWidth: 170, backgroundColor: "#B8BDB5" }}
                      >
                        <TableSortLabel
                          active={sortBy === "notation"}
                          direction={
                            sortBy === "notation" ? sortDirection : "asc"
                          }
                          onClick={() => handleSort("notation")}
                        >
                          Notation
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedAlgorithms
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((algorithm) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={algorithm.id}
                        >
                          <TableCell>
                            {algorithm.type === "f2l" ? (
                              <img
                                src={`https://htehsqojzxpuxehiazps.supabase.co/storage/v1/object/public/algs_images/f2l/${algorithm.name}.svg`}
                                alt={`${algorithm.name.toUpperCase()} Algorithm`}
                                className="w-24 h-24 object-contain"
                              />
                            ) : algorithm.type === "oll" ? (
                              <img
                                src={`https://htehsqojzxpuxehiazps.supabase.co/storage/v1/object/public/algs_images/oll/${algorithm.name}.svg`}
                                alt={`${algorithm.name.toUpperCase()} Algorithm`}
                                className="w-24 h-24 object-contain"
                              />
                            ) : algorithm.type === "pll" ? (
                              <img
                                src={`https://htehsqojzxpuxehiazps.supabase.co/storage/v1/object/public/algs_images/pll/${algorithm.name}.svg`}
                                alt={`${algorithm.name.toUpperCase()} Algorithm`}
                                className="w-24 h-24 object-contain"
                              />
                            ) : (
                              <span className="text-gray-500">
                                Unknown Type
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{algorithm.name.toUpperCase()}</TableCell>
                          <TableCell>{algorithm.notation}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredAlgorithms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ backgroundColor: "#B8BDB5" }}
              />
            </>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Algorithms;
