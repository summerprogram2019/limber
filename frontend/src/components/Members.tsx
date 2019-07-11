import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Avatar, Tooltip } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import Skeleton from 'react-loading-skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    members: {
      
    },
    avatar: {
      margin: 2
    },
    avatarsContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },
    skeleton: {
      margin: 2
    }
  }),
);

interface Member {
  name?: string,
  picture?: string
}

interface MembersProps {
  members?: Member[]
}

const Members: React.FC<MembersProps> = ({ members = Array(10).fill({}) }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.members}>
      <CardContent>
        <Typography gutterBottom align="left" variant="h5" component="h3">
          {t("Members")}
          {members && (" (" + members.length + ")")}
        </Typography>
        <div className={classes.avatarsContainer}>
          {members.map(member => {
            if (member && member.name) {
              return (
                <Tooltip title={member.name}>
                  <Avatar alt={member.name} src={member.picture} className={classes.avatar}/>
                </Tooltip>
              );
            } else {
              return <div className={classes.skeleton}><Skeleton circle height={40} width={40}/></div>;
            }
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Members;