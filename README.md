
# MailTrackJS
Incomplete...

App doesn't Persist your SMTP Info if you want to use the SMTP auto appender otherwise you can just copy the generated image url and append it to your email HTML manually.

Make sure to add it to the email HTML instead of importing it through Gmail or outlook's image feature because that serves it from a diffirent server.

### TODO

 - [ ] Gmail uses a proxy to open images so location data is incorrect find a way to solve it
 - [ ] Possibly add a desktop app using tauri so people don't have to worry about using their SMTP credentials
 - [ ] Make the UI look pretty and add delete button for unused trackers.
 - [ ] Probably refactor the code and rename some entities because the names are sorta confusing
