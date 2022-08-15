import React from "react";
import type { Student, fetchWrapperprop } from "../components/ComponentTypes";

export function _updateData(
  params: string,
  setData: (arg0: Student[]) => void
) {
  fetch(params).then((result) => {
    result.json().then((resp: Student[]) => {
      setData(resp);
    });
  });
}

export async function fetchWrapper({
  method = "GET",
  body,
  url,
}: fetchWrapperprop) {
  const requestOptions = {
    method: method,
    headers:
      { Accept: "application/json", "Content-Type": "application/json" } || {},
    body: JSON.stringify(body) || undefined,
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}
async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}
