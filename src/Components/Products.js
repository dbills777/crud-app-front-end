// return characters.map((item) => {
//   return (
//     <Card key={item.char_id} className={classes.root}>
//       <Dialog open={deleteOpen}>
//         <DialogTitle> {item.name} Details</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Are you sure you want to delete {item.name}?</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button>Cancel</Button>
//           <Button>Delete Character</Button>
//         </DialogActions>
//       </Dialog>
//       <CardHeader
//         action={
//           <IconButton aria-label='settings' color={'white'}>
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={classes.title}
//         subheader={item.name}
//       />
//       <CardMedia color='white' className={classes.media} image={item.image} title={item.name} />
//       <CardContent>
//         <Typography variant='body2' color='white' component='p'>
//           <strong>Nick Name: </strong>
//           {item.nickname}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label='Delete'>
//           <DeleteIcon />
//         </IconButton>
//         <IconButton aria-label='share'>
//           <EditIcon />
//         </IconButton>
//         <IconButton
//           className={clsx(classes.expand[item.char_id], {
//             [classes.expandOpen]: expanded[item.char_id],
//           })}
//           onClick={() => handleExpandClick(item.char_id)}
//           aria-expanded={expanded}
//           aria-label='show more'
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </CardActions>
//       <Collapse in={expanded[item.char_id]} timeout='auto' unmountOnExit>
//         <CardContent>
//           <Typography paragraph>
//             <strong>INFO:</strong>
//           </Typography>
//           {item.birthday !== 'Unknown' ? (
//             <Typography paragraph>
//               <strong>DOB: </strong>
//               {item.birthday}
//             </Typography>
//           ) : null}

//           <Typography paragraph>
//             <strong>Occupation: </strong>
//             {item.occupation.join(', ')}
//           </Typography>
//           <Typography paragraph>
//             <strong>Portrayed by : </strong>
//             {item.portrayed}
//           </Typography>
//           <Typography paragraph>
//             <strong>Living Status: </strong>
//             {item.status}
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// });
