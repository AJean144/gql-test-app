import XLSX from 'xlsx'
import moment from 'moment'
import {get} from 'lodash'
import { saveAs } from "file-saver";

export const downloadWorkBook = data => {
  const { first_name, last_name } = get(data, "account.users[0]");
  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: "In-depth Flights Report",
    Subject: "Flights Report",
    Author: `${(first_name, last_name)} ${(first_name, last_name)}`,
    CreatedDate: moment().format()
  };
  wb.SheetNames.push("In-depth Flights Report");
  const ws_data = [["hello", "world"]];
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets["In-depth Flights Report"] = ws;

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf); //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
    return buf;
  }
  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    "In-depth Flights Report.xlsx"
  );
};
