# ui_developer_test

### Project setup - `npm install`

### Compiles and hot-reloads for development - `npm run serve`

### Run unit tests - `npm run test:unit`

## Notes & Thoughts

### Approach
I approached this task with a focus on enabling the passage of any downloadable data schema into the component. All of the headers, checkbox keys, fields requiring capitalization, and fields requiring green circles are handled generically, or dynamically via the additional props that are passed to the component. For future considerations, the component would need to be adapted. Such as:
- In order to spend my time where I needed to most, I developed in Chrome. Before shipping this, I would need to confirm functionality and UI in other browsers. 
- The value associated with the `labelKeyProp`, would need to be scrubbed of any characters that could impact dynamically created class attributes.
- When iterating over an array to create content, the key in each of these cases is currently using the index. As of right now that's fine because these rows aren't currently changing, but if there's an option to change the order of, add, or delete rows, then these keys would need to be changed to something else.
- Right now, everything is being passed down to `<FileDownloadTable/>` via the parent (`<App/>`). The data and schema consts that are created or imported in the parent (e.g. `DOWNLOADABLE_KEYS` / `AVAILABLE`) would clearly need to be cleaned up depending on API calls and their associated schemas.
- Styling to accomodate the green circle from overlapping other fields would also need to be considered.

### Accessibility
Per screen readers, I tried to stick to appropriate HTML semantic elements in order to enable as many out-of-the-box features as possible. There were definitely some things I'd need to research more before shipping this, such as:
- Should I create the Select All and Download row outside of a `<tr>` and avoid using the `colspan` attribute?
- Should I add some sort of aria label to a tr when it's selected or hovered?
- Are there additional tags I could use to make navigating through the table more explicit?

I used a screen reader to interact with the table and, personally, found that adding the `aria-label` to the checkbox and `aria-colspan` to the top row to be helpful, but I'd need to research best practices.

### Other Considerations
1. If I were given this task I would have wanted to confirm the expected UX. It seems odd that you can *select all* files, even if they're not downloadable. The user only knows they didn't download a **scheduled** item if they read the list of files downloaded in the alert. It seems a better approach would be preventing them from selecting non-downloadable files. I could have handled some sort of error message for this task, but didn't want to deviate from the instructions.
2. Similarly, the **select all** button would also need to be updated to reflect that *all* means all available files.
3. The **download/alert action** is currently handled in the `<FileDownloadTable/>`, but ideally, if this were actually making an API call, then it would be handled outside of this file.
4. I wasn't able to test that each `<td>` matched with it's appropriate row because of an issue with key bindings not being created in the jest wrapper. I'd want to figure out a way to test this before shipping.