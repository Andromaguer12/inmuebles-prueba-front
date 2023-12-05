import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Skeleton } from '@mui/material';

export default function SkeletonProjectCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={50} height={50} />}
        title={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
        subheader={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
      />
      <Skeleton variant="rectangular" width={345} height={180} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={210} />
      </CardContent>
      <CardActions disableSpacing>
        <Skeleton
          variant="circular"
          sx={{ marginRight: '10px' }}
          width={30}
          height={30}
        />
        <Skeleton
          variant="circular"
          sx={{ marginRight: '10px' }}
          width={30}
          height={30}
        />
        <Skeleton
          variant="circular"
          sx={{ marginRight: '10px' }}
          width={30}
          height={30}
        />
      </CardActions>
    </Card>
  );
}
